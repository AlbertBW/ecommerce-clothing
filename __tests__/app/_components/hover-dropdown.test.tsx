import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HoverDropdown from "@/app/_components/hover-dropdown";

describe("HoverDropdown", () => {
  it("renders the trigger element", () => {
    render(
      <HoverDropdown
        trigger={<div>Trigger</div>}
        dropdown={<div>Dropdown content</div>}
      />
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("shows the dropdown when hovered over the trigger", () => {
    render(
      <HoverDropdown
        trigger={<button>Trigger</button>}
        dropdown={<div>Dropdown content</div>}
      />
    );
    const trigger = screen.getByTestId("hover-trigger");
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText("Dropdown content")).toBeInTheDocument();
  });

  it("hides the dropdown when mouse leaves the trigger", () => {
    render(
      <HoverDropdown
        trigger={<button>Trigger</button>}
        dropdown={<div>Dropdown content</div>}
      />
    );
    const trigger = screen.getByTestId("hover-trigger");
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText("Dropdown content")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);

    expect(screen.queryByText("Dropdown content")).not.toBeInTheDocument();
  });
});
