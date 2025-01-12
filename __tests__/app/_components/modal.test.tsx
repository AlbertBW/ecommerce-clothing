import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "@/app/_components/modal";

describe("Modal", () => {
  it("renders the modal with children", () => {
    render(
      <Modal close={() => {}}>
        <div>Test Child</div>
      </Modal>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("calls 'close' when background is clicked", () => {
    const closeMock = jest.fn();
    render(
      <Modal close={closeMock}>
        <div>Test Child</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("close-on-click"));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
