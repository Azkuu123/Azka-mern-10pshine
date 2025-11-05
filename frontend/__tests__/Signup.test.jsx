import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../src/pages/SignUp/SignUp";

describe("Signup Component", () => {
  test("renders signup form correctly", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

test("shows error message if user leaves fields empty", () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByRole("button", { name: /create account/i }));

  // The UI shows this message when fields are empty:
  expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
});

});
