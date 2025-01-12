import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAccount from "@/app/(store)/_components/_layout/_header/user-account";
import { SignOut } from "../../../../../../src/app/(store)/_components/_auth/sign-out";
import Image from "next/image";

// Mock the HoverDropdown, DropdownMenu, UserAvatar, and SignOut components
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

jest.mock(
  "../../../../../../src/app/(store)/_components/_auth/user-avatar",
  () => ({
    __esModule: true,
    default: jest.fn(() => (
      <Image
        width={100}
        height={100}
        src="/"
        alt="User Avatar"
        data-testid="user-avatar"
      />
    )),
  })
);

jest.mock(
  "../../../../../../src/app/(store)/_components/_auth/sign-out",
  () => ({
    __esModule: true,
    SignOut: jest.fn(() => <button data-testid="sign-out">Sign Out</button>),
  })
);

describe("UserAccount", () => {
  it("renders the UserAvatar", () => {
    render(<UserAccount />);
    expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
  });

  it("renders the dropdown menu with correct items", () => {
    render(<UserAccount />);
    fireEvent.mouseOver(screen.getByTestId("hover-dropdown-trigger"));

    expect(screen.getByText("User's Name")).toBeInTheDocument();
    expect(screen.getByText("Your account")).toBeInTheDocument();
    expect(screen.getByText("Your Orders")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByTestId("sign-out")).toBeInTheDocument();
  });

  it("navigates to the account page when 'Your account' is clicked", () => {
    render(<UserAccount />);
    fireEvent.mouseOver(screen.getByTestId("hover-dropdown-trigger"));
    expect(screen.getByText("Your account")).toHaveAttribute(
      "href",
      "/account"
    );
  });

  it("navigates to the orders page when 'Your Orders' is clicked", () => {
    render(<UserAccount />);
    fireEvent.mouseOver(screen.getByTestId("hover-dropdown-trigger"));

    expect(screen.getByText("Your Orders")).toHaveAttribute("href", "/orders");
  });

  it("navigates to the settings page when 'Settings' is clicked", () => {
    render(<UserAccount />);
    fireEvent.mouseOver(screen.getByTestId("hover-dropdown-trigger"));

    expect(screen.getByText("Settings")).toHaveAttribute(
      "href",
      "/account/settings"
    );
  });

  it("calls the SignOut component when 'Sign Out' is clicked", () => {
    render(<UserAccount />);
    fireEvent.mouseOver(screen.getByTestId("hover-dropdown-trigger"));
    fireEvent.click(screen.getByTestId("sign-out"));
    expect(SignOut).toHaveBeenCalled();
  });
});
