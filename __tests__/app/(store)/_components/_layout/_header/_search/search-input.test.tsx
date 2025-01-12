import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "@/app/(store)/_components/_layout/_header/_search/search-input";

describe("SearchInput", () => {
  const mockRef = jest.fn();
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(
      <SearchInput
        ref={mockRef}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        value=""
      />
    );
  });

  it("renders the input element", () => {
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockOnChange).toHaveBeenCalledWith("test");
  });

  it("calls onSubmit when button is pressed", () => {
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "test" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("calls onKeyDown when a key is pressed", () => {
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockOnSubmit).toHaveBeenCalledWith("Enter");
  });
});

describe("SearchInput without beforeEach", () => {
  it("has the correct placeholder value", () => {
    const error = "Test Error";
    render(
      <SearchInput
        ref={jest.fn()}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
        value=""
        error={error}
      />
    );
    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("placeholder", error);
  });
});
