import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

const mockFunction = vi.fn();

describe("Button", () => {
  afterEach(() => {
    mockFunction.mockClear();
  });

  it("shouldn't execute onClick when loading", async () => {
    render(<Button text="Test" onClick={mockFunction} isLoading />);

    const button = screen.getByRole("button", {
      name: /Test/i,
    });

    await userEvent.click(button);

    expect(mockFunction).not.toHaveBeenCalled();
  });

  it("should execute onClick", async () => {
    render(<Button text="Test" onClick={mockFunction} />);

    const button = screen.getByRole("button", {
      name: /Test/i,
    });

    await userEvent.click(button);

    expect(mockFunction).toHaveBeenCalled();
  });
});
