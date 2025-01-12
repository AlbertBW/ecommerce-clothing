import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DropdownMenu from "@/app/(store)/_components/_layout/_header/dropdown-menu";

describe("DropdownMenu", () => {
  const title = "Menu Title";
  const listItems = [
    <p key="item1">Item 1</p>,
    <p key="item2">Item 2</p>,
    <p key="item3">Item 3</p>,
  ];
  const listClassName = "flex flex-col items-center gap-4";

  it("renders the title", () => {
    render(<DropdownMenu title={title} listItems={listItems} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders the list items", () => {
    render(<DropdownMenu title={title} listItems={listItems} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("applies the listClassName to the list container", () => {
    render(
      <DropdownMenu
        title={title}
        listItems={listItems}
        listClassName={listClassName}
      />
    );
    const listContainer = screen.getByRole("list");
    expect(listContainer).toHaveClass(listClassName);
  });
});
