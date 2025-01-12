import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from "../../../src/app/(store)/layout";
import Header from "../../../src/app/(store)/_components/_layout/_header/header";
import Footer from "../../../src/app/(store)/_components/_layout/footer";

jest.mock("../../../src/app/(store)/_components/_layout/header");
jest.mock("../../../src/app/(store)/_components/_layout/footer");

describe("RootLayout", () => {
  it("renders the layout with children", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders the Header component", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(Header).toHaveBeenCalled();
  });

  it("renders the Footer component", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(Footer).toHaveBeenCalled();
  });

  it("should have the correct classes on the body element", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = document.querySelector("body");
    expect(body).toHaveClass("font-mono antialiased min-h-dvh");
  });
});
