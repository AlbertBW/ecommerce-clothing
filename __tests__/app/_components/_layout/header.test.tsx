import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/app/(store)/_components/_layout/header";
import { COMPANY_NAME } from "@/lib/config";
import { auth } from "../../../../src/server/auth";
import UserAccount from "../../../../src/app/(store)/_components/_layout/user-account";

jest.mock("../../../../src/server/auth", () => ({
  auth: jest.fn(),
}));
jest.mock(
  "../../../../src/app/(store)/_components/_layout/user-account",
  () => {
    const UserAccountMock = () => <div>User Account Mock</div>;
    UserAccountMock.displayName = "UserAccountMock";
    return UserAccountMock;
  }
);

const mockSession = {
  user: {
    name: "Albert Wales",
    email: "abwales@gmail.com",
  },
  expires: "2025-02-09T17:31:45.945Z",
};

describe("Header", () => {
  it("Renders the company name and home link", async () => {
    render(await Header());
    const companyName = screen.getByText(COMPANY_NAME);
    expect(companyName).toBeInTheDocument();
    expect(companyName.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders the search box", async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);
    render(await Header());
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders the shopping cart", async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);
    render(await Header());
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the sign-in link when no user is logged in", async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);
    render(await Header());
    expect(screen.getByText("Sign In / Register")).toBeInTheDocument();
  });

  it("renders the user account when a user is logged in", async () => {
    (auth as jest.Mock).mockResolvedValueOnce("authenticated");

    render(await Header());

    expect(await screen.findByText("User Account Mock")).toBeInTheDocument();
  });
});
