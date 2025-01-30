import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/app/(store)/_components/_layout/_header/header";
import { COMPANY_NAME } from "@/config";
import { auth } from "../../../../../../src/server/auth";
import UserAccount from "../../../../../../src/app/(store)/_components/_layout/_header/user-account";
import SearchBox from "../../../../../../src/app/(store)/_components/_layout/_header/_search/search-box";
import ShoppingCart from "../../../../../../src/app/(store)/_components/_layout/_header/shopping-cart";
import SignIn from "../../../../../../src/app/_components/_auth/sign-in";

jest.mock(
  "../../../../../../src/app/(store)/_components/_layout/_header/_search/search-box"
);
jest.mock(
  "../../../../../../src/app/(store)/_components/_layout/_header/shopping-cart"
);
jest.mock(
  "../../../../../../src/app/(store)/_components/_layout/_header/user-account"
);
jest.mock("../../../../../../src/app/(store)/_components/_auth/sign-in");

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
    expect(SearchBox).toHaveBeenCalled();
  });

  it("renders the shopping cart", async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);
    render(await Header());
    expect(ShoppingCart).toHaveBeenCalled();
  });

  it("renders the sign-in link when no user is logged in", async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);
    render(await Header());
    expect(SignIn).toHaveBeenCalled();
  });

  it("renders the user account when a user is logged in", async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ user: true });

    render(await Header());

    expect(UserAccount).toHaveBeenCalled();
  });
});
