import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../../../../../src/app/(store)/_components/_layout/footer";
import { AUTHOR_GITHUB } from "@/config";

describe("Footer", () => {
  it("displays the copyright notice", () => {
    const { getByText } = render(<Footer />);
    const copyrightNotice = getByText(/©/i);
    const copyrightAuthor = getByText(/Albert Wales/i);
    expect(copyrightNotice).toBeInTheDocument();
    expect(copyrightAuthor).toBeInTheDocument();
  });

  it("renders author GitHub link with correct href", () => {
    render(<Footer />);
    const copyrightAuthor = screen.getByText(/Albert Wales/i);

    expect(copyrightAuthor.closest("a")).toHaveAttribute("href", AUTHOR_GITHUB);
  });

  it("renders GitHub logos with correct classes for themes", () => {
    const { getByAltText } = render(<Footer />);
    const githubLogoWhite = getByAltText("GitHub Logo White");
    const githubLogoBlack = getByAltText("GitHub Logo Black");

    expect(githubLogoWhite).toHaveClass("hidden dark:block");
    expect(githubLogoBlack).toHaveClass("block dark:hidden");
  });

  it("renders GitHub links with correct href", () => {
    const { getByAltText } = render(<Footer />);
    const githubLogoWhite = getByAltText("GitHub Logo White");
    const githubLogoBlack = getByAltText("GitHub Logo Black");

    expect(githubLogoWhite.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/AlbertBW/ecommerce-clothing"
    );
    expect(githubLogoBlack.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/AlbertBW/ecommerce-clothing"
    );
  });
});
