import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";

describe("Navbar Component", () => {
  const mockOnSearchNote = jest.fn();
  const mockHandleClearSearch = jest.fn();
  const mockUserInfo = { fullName: "Azka" };

  const renderNavbar = () => {
    return render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Navbar
          userInfo={mockUserInfo}
          onSearchNote={mockOnSearchNote}
          handleClearSearch={mockHandleClearSearch}
        />
      </MemoryRouter>
    );
  };

  test("calls search function when search icon is clicked", () => {
    renderNavbar();

    const input = screen.getByPlaceholderText(/search notes/i);
    fireEvent.change(input, { target: { value: "work" } }); // type in search

    const searchBtn = screen.getByTestId("search-button");
    fireEvent.click(searchBtn);

    expect(mockOnSearchNote).toHaveBeenCalledWith("work");
  });

  test("shows user name in profile section", () => {
    renderNavbar();

    expect(screen.getByText(/azka/i)).toBeInTheDocument();
  });
});
