import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBox from "@/app/(store)/_components/_layout/_header/_search/search-box";
import useSearchBox from "../../../../../../../src/hooks/useSearchBox";
import SearchInput from "../../../../../../../src/app/(store)/_components/_layout/_header/_search/search-input";
import Modal from "../../../../../../../src/app/_components/modal";

jest.mock("../../../../../../../src/hooks/useSearchBox");
jest.mock(
  "../../../../../../../src/app/(store)/_components/_layout/_header/_search/search-input"
);
jest.mock("../../../../../../../src/app/_components/modal");

describe("SearchBox", () => {
  const mockUseSearchBox = useSearchBox as jest.MockedFunction<
    typeof useSearchBox
  >;

  beforeEach(() => {
    mockUseSearchBox.mockReturnValue([
      { current: null }, // inputRef
      false, // inputOpen
      jest.fn(), // toggleInput
      jest.fn(), // handleSetInput
      jest.fn(), // handleSubmit
      "", // error
      "", // inputValue
    ]);
  });

  it("renders the SearchBox component", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("desktop-search")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-search")).toBeInTheDocument();
  });

  it("renders the search input in desktop view", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("desktop-search")).toBeInTheDocument();
    expect(SearchInput).toHaveBeenCalled();
  });

  it("toggles the search input in mobile view", () => {
    const toggleInput = jest.fn();
    mockUseSearchBox.mockReturnValueOnce([
      { current: null }, // inputRef
      false, // inputOpen
      toggleInput, // toggleInput
      jest.fn(), // handleSetInput
      jest.fn(), // handleSubmit
      "", // error
      "", // inputValue
    ]);

    render(<SearchBox />);
    const button = screen.getByTestId("open-search-modal");
    fireEvent.click(button);
    expect(toggleInput).toHaveBeenCalled();
  });

  it("opens the modal with search input in mobile view", () => {
    mockUseSearchBox.mockReturnValueOnce([
      { current: null }, // inputRef
      true, // inputOpen
      jest.fn(), // toggleInput
      jest.fn(), // handleSetInput
      jest.fn(), // handleSubmit
      "", // error
      "", // inputValue
    ]);

    render(<SearchBox />);
    expect(screen.getByTestId("mobile-search")).toBeInTheDocument();
    expect(Modal).toHaveBeenCalled();
    expect(SearchInput).toHaveBeenCalled();
  });
});
