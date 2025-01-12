import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingCart from "@/app/(store)/_components/_layout/_header/shopping-cart";

jest.mock("../../../../../../src/app/_components/hover-dropdown", () => ({
  __esModule: true,
  default: jest.fn(({ trigger, dropdown }) => (
    <div>
      <div data-testid="hover-dropdown-trigger">{trigger}</div>
      <div data-testid="hover-dropdown-content">{dropdown}</div>
    </div>
  )),
}));

jest.mock(
  "../../../../../../src/app/(store)/_components/_layout/_header/dropdown-menu",
  () => ({
    __esModule: true,
    default: jest.fn(({ title, listItems, listClassName }) => (
      <div>
        <h2>{title}</h2>
        <div className={listClassName}>{listItems}</div>
      </div>
    )),
  })
);

describe("ShoppingCart", () => {
  it("renders the ShoppingCart and passes the correct props to HoverDropdown", () => {
    render(<ShoppingCart />);
    expect(screen.getByTestId("hover-dropdown-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("hover-dropdown-content")).toBeInTheDocument();
  });

  it("renders the correct cart items in DropdownMenu", () => {
    render(<ShoppingCart />);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getAllByText("Cart Item")).toHaveLength(3);
    expect(screen.getByText("View cart")).toBeInTheDocument();
  });
});
