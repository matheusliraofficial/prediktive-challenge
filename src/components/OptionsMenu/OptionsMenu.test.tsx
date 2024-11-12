import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OptionsMenu } from "./OptionsMenu";

describe("OptionsMenu", () => {
  const mockItems = [
    { label: "Edit", onClick: jest.fn() },
    { label: "Delete", onClick: jest.fn() },
    { label: "Disabled Option", onClick: jest.fn(), disabled: true },
  ];

  const defaultProps = {
    children: <div>Right click me</div>,
    items: mockItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(<OptionsMenu {...defaultProps} />);
    expect(screen.getByText("Right click me")).toBeInTheDocument();
  });

  it("shows menu on right click", () => {
    render(<OptionsMenu {...defaultProps} />);

    const trigger = screen.getByText("Right click me");
    fireEvent.contextMenu(trigger);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Disabled Option")).toBeInTheDocument();
  });

  it("calls onClick handler when menu item is clicked", async () => {
    render(<OptionsMenu {...defaultProps} />);

    const trigger = screen.getByText("Right click me");
    fireEvent.contextMenu(trigger);

    const editButton = screen.getByText("Edit");
    await userEvent.click(editButton);

    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it("doesn't call onClick handler for disabled items", () => {
    render(<OptionsMenu {...defaultProps} />);

    const trigger = screen.getByText("Right click me");
    fireEvent.contextMenu(trigger);

    const disabledButton = screen.getByText("Disabled Option");
    userEvent.click(disabledButton);

    expect(mockItems[2].onClick).not.toHaveBeenCalled();
  });

  it("positions menu at click coordinates", () => {
    render(<OptionsMenu {...defaultProps} />);

    const trigger = screen.getByText("Right click me");
    fireEvent.contextMenu(trigger, {
      clientX: 100,
      clientY: 200,
    });

    const menu = screen.getByTestId("options-menu");
    expect(menu).toHaveAttribute('style', expect.stringContaining('--x-position: 100px'));
    expect(menu).toHaveAttribute('style', expect.stringContaining('--y-position: 200px'));
  });

  it("renders icons when provided", () => {
    const itemsWithIcons = [
      {
        label: "Edit",
        onClick: jest.fn(),
        icon: <span data-testid="edit-icon">✏️</span>,
      },
    ];

    render(
      <OptionsMenu
        children={<div>Right click me</div>}
        items={itemsWithIcons}
      />
    );

    const trigger = screen.getByText("Right click me");
    fireEvent.contextMenu(trigger);

    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });
});
