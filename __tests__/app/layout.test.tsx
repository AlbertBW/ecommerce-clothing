import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RootLayout from "@/app/(store)/layout";
import Header from "../../src/app/(store)/_components/_layout/header";
import Footer from "../../src/app/(store)/_components/_layout/footer";

jest.mock("../../src/app/(store)/_components/_layout/header");
jest.mock("../../src/app/(store)/_components/_layout/footer");

describe.skip("RootLayout", () => {
  it("renders the layout with children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
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
    expect(body).toHaveClass("font-mono antialiased min-h-screen");
  });
});
