import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; 
import Login from "../src/pages/Login/Login";

describe("Login Component", () => {
  test("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

test("shows validation error if fields are empty", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // The UI shows this message:
  expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
});

});
