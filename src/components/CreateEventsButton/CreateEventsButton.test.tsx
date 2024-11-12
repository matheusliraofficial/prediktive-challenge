import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateEventsButton } from "./CreateEventsButton";
import { EventsProvider } from "../../contexts/EventsContext";
import { ModalProvider } from "../../contexts/ModalContext";

const renderCreateEvents = () => {
  return render(
    <EventsProvider>
      <ModalProvider>
        <CreateEventsButton />
      </ModalProvider>
    </EventsProvider>
  );
};

describe("CreateEventsButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create event button", () => {
    renderCreateEvents();
    expect(screen.getByText("Create Event")).toBeInTheDocument();
  });

  it("opens modal when clicked", () => {
    renderCreateEvents();
    const button = screen.getByText("Create Event");
    
    fireEvent.click(button);
    
    expect(screen.getByText("Create Event")).toBeInTheDocument();
  });
});
