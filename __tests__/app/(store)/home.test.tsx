import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(store)/page";

describe.skip("Home", () => {
  it("Renders Home", () => {
    render(<Home />);
  });
});
