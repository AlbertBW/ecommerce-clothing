import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe.skip("Home", () => {
  it("Renders Home", () => {
    render(<Home />);
  });
});
