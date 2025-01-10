import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Footer from "@/app/(store)/_components/_layout/footer";

describe("Footer", () => {
  it("Renders Footer", () => {
    render(<Footer />);
  });

  it("displays the copyright notice", () => {
    const { getByText } = render(<Footer />);
    const copyrightNotice = getByText(/©/i);
    const copyrightAuthor = getByText(/Albert Wales/i);
    expect(copyrightNotice).toBeInTheDocument();
    expect(copyrightAuthor).toBeInTheDocument();
  });

  it("renders author GitHub link with correct href", () => {
    const { getByText } = render(<Footer />);
    const copyrightAuthor = getByText(/Albert Wales/i);

    expect(copyrightAuthor.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/AlbertBW"
    );
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
