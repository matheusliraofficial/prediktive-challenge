import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import { EventsProvider } from "../../contexts/EventsContext";
import { ModalContext } from "../../contexts/ModalContext";
import { EventsModal } from "./EventsModal";
import userEvent from "@testing-library/user-event";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockModalContext = {
  isOpen: true,
  content: {
    id: 0,
    name: "",
    start: "",
    end: "",
  },
  editEvent: jest.fn(),
  openModal: jest.fn(),
  closeModal: jest.fn(),
};

const renderEventsModal = (isOpen = true) => {
  return render(
    <EventsProvider>
      <ModalContext.Provider value={mockModalContext}>
        <EventsModal isOpen={isOpen} />
      </ModalContext.Provider>
    </EventsProvider>
  );
};

describe("EventsModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when isOpen is false", () => {
    renderEventsModal(false);
    expect(screen.queryByText("Create Event")).not.toBeInTheDocument();
  });

  it("renders the modal when isOpen is true", async () => {
    renderEventsModal();
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    renderEventsModal();

    const nameInput = screen.getByLabelText("Event Name");
    const startInput = screen.getByLabelText("Start Date");
    const endInput = screen.getByLabelText("End Date");

    fireEvent.change(nameInput, { target: { value: "Test Event" } });
    fireEvent.change(startInput, { target: { value: "2024-01-01" } });
    fireEvent.change(endInput, { target: { value: "2024-01-02" } });

    expect(nameInput).toHaveValue("Test Event");
    expect(startInput).toHaveValue("2024-01-01");
    expect(endInput).toHaveValue("2024-01-02");
  });

  it("shows error toast when submitting without required fields", () => {
    renderEventsModal();

    const submitButton = screen.getByText("Create");
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith("Event end date is required");
  });

  it("shows error when end date is before start date", () => {
    renderEventsModal();

    const nameInput = screen.getByLabelText("Event Name");
    const startInput = screen.getByLabelText("Start Date");
    const endInput = screen.getByLabelText("End Date");
    const submitButton = screen.getByText("Create");

    fireEvent.change(nameInput, { target: { value: "Test Event" } });
    fireEvent.change(startInput, { target: { value: "2024-01-02" } });
    fireEvent.change(endInput, { target: { value: "2024-01-01" } });
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Event start date must be before end date"
    );
  });

  it("closes modal when clicking close button", async () => {
    renderEventsModal();

    const closeButton = screen.getByTestId("modal-close");
    await userEvent.click(closeButton);

    expect(mockModalContext.closeModal).toHaveBeenCalled();
  });

  it("closes modal when clicking backdrop", async () => {
    renderEventsModal();

    const backdrop = screen.getByTestId("modal-backdrop");
    await userEvent.click(backdrop);

    expect(mockModalContext.closeModal).toHaveBeenCalled();
  });
});
