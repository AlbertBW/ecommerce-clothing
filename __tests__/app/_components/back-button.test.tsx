import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import BackButton from "@/app/_components/back-button";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  it("renders the button", () => {
    render(<BackButton />);
    expect(
      screen.getByRole("button", { name: /Go back/i })
    ).toBeInTheDocument();
  });

  it("calls router.back when clicked", () => {
    const back = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ back });

    render(<BackButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(back).toHaveBeenCalled();
  });
});
