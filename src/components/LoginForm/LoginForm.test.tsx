import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import { describe, expect, it, vi } from "vitest";
import {
  emailIsRequired,
  enterAtLeastCharacters,
  enterAValidEmail,
  passwordIsRequired,
} from "../../utils/validation-messages";
import { LoginForm } from "./LoginForm";
import { minPasswordCharacters } from "./utils/min-password-characters";

const mockFetchLogin = vi.fn().mockResolvedValue(undefined);

vi.mock("../../hooks/useLogin", () => ({
  useLogin: () => ({
    mutateAsync: mockFetchLogin,
  }),
}));

describe("LoginForm", () => {
  it("should display email and password inputs", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should display an error message when invalid email", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await userEvent.type(emailInput, "john");
    await userEvent.click(button);

    const errorMessage = await screen.findByText(enterAValidEmail);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display an error message when email or password are empty on submit", async () => {
    render(<LoginForm />);

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await userEvent.click(button);

    const emptyEmailMessage = screen.getByText(emailIsRequired);
    const emptyPasswordMessage = screen.getByText(passwordIsRequired);

    expect(emptyEmailMessage).toHaveTextContent(emailIsRequired);
    expect(emptyPasswordMessage).toHaveTextContent(passwordIsRequired);
  });

  it(`should display an error message when the password is less than ${minPasswordCharacters} characters long`, async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await userEvent.type(passwordInput, "12345");
    await userEvent.click(button);

    const errorMessage = await screen.findByText(enterAtLeastCharacters(minPasswordCharacters));

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display a success toast after submit", async () => {
    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    );

    const inputEmail = screen.getByRole("textbox", {
      name: /email/i,
    });
    const inputPassword = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await userEvent.type(inputEmail, "jo@hotmail.com");

    await userEvent.type(inputPassword, "123456");

    await userEvent.click(button);

    await waitFor(async () => {
      const toastMessage = await screen.findByText(/login successful./i);

      expect(toastMessage).toBeInTheDocument();
      expect(toastMessage).toHaveClass("Toastify__toast--success");
    });
  });

  it("should clear all fields after submit", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await userEvent.type(emailInput, "joao@gmail.com");
    await userEvent.type(passwordInput, "125487");

    await userEvent.click(button);

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });
});
