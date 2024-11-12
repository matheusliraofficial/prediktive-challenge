import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Timeline } from "./Timeline";
import { EventsProvider } from "../../contexts/EventsContext";
import { ModalProvider } from "../../contexts/ModalContext";

const mockEvents = [
  {
    id: 1,
    name: "Test Event 1",
    start: "2024-01-01",
    end: "2024-01-05",
  },
  {
    id: 2,
    name: "Test Event 2",
    start: "2024-01-06",
    end: "2024-01-10",
  },
];

const renderTimeline = () => {
  return render(
    <EventsProvider>
      <ModalProvider>
        <Timeline events={mockEvents} />
      </ModalProvider>
    </EventsProvider>
  );
};

describe("Timeline", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders timeline with events", () => {
    renderTimeline();
    expect(screen.getByText("Test Event 1")).toBeInTheDocument();
    expect(screen.getByText("Test Event 2")).toBeInTheDocument();
  });

  it("renders zoom controls", () => {
    renderTimeline();
    expect(screen.getByText("Zoom In +")).toBeInTheDocument();
    expect(screen.getByText("Zoom Out -")).toBeInTheDocument();
  });

  it("handles zoom in functionality", () => {
    renderTimeline();
    const zoomInButton = screen.getByText("Zoom In +");
    
    fireEvent.click(zoomInButton);
    
    expect(zoomInButton).not.toBeDisabled();
  });

  it("handles zoom out functionality", () => {
    renderTimeline();
    const zoomOutButton = screen.getByText("Zoom Out -");
    
    fireEvent.click(zoomOutButton);
    
    expect(zoomOutButton).toBeDisabled();
  });

  it("shows context menu on right click", () => {
    renderTimeline();
    const event = screen.getByText("Test Event 1");
    
    fireEvent.contextMenu(event);
    
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("renders time markers", () => {
    renderTimeline();
    const markers = screen.getAllByText(/Jan/);
    expect(markers.length).toBeGreaterThan(0);
  });

  it("maintains zoom state between 0.5 and 10", () => {
    renderTimeline();
    const zoomInButton = screen.getByText("Zoom In +");
    const zoomOutButton = screen.getByText("Zoom Out -");

    while (!zoomOutButton.hasAttribute("disabled")) {
      fireEvent.click(zoomOutButton);
    }
    expect(zoomOutButton).toHaveAttribute("disabled");

    for (let i = 0; i < 20; i++) {
      fireEvent.click(zoomInButton);
    }
    expect(zoomInButton).toHaveAttribute("disabled");
  });
});
