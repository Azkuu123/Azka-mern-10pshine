import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoteCard from "../src/components/Cards/NoteCard";

describe("NoteCard Component", () => {
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const mockPin = jest.fn();

  const noteProps = {
    title: "Test Note",
    date: "2024-02-10",
    content: "<p>This is a test note content</p>",
    tags: ["work", "urgent"],
    isPinned: false,
    color: "#ffffff",
    onEdit: mockEdit,
    onDelete: mockDelete,
    onPinNote: mockPin,
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
    render(<NoteCard {...noteProps} />);
  });

  test("renders note title", () => {
    expect(screen.getAllByText(/test note/i)[0]).toBeInTheDocument();
  });

  test("renders tags correctly", () => {
    expect(screen.getByText("#work", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("#urgent", { exact: false })).toBeInTheDocument();
  });

  test("calls edit function when edit button is clicked", () => {
    const editBtn = screen.getByTestId("edit-button");
    fireEvent.click(editBtn);
    expect(mockEdit).toHaveBeenCalledTimes(1);
  });

  test("calls pin function when pin button is clicked", () => {
    const pinBtn = screen.getByTestId("pin-button");
    fireEvent.click(pinBtn);
    expect(mockPin).toHaveBeenCalledTimes(1);
  });

  test("shows confirmation and deletes when confirmed", () => {
    window.confirm = jest.fn(() => true);
    const deleteBtn = screen.getByTestId("delete-button");
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test("does NOT delete when cancelled", () => {
    window.confirm = jest.fn(() => false);
    const deleteBtn = screen.getByTestId("delete-button");
    fireEvent.click(deleteBtn);
    expect(mockDelete).not.toHaveBeenCalled();
  });
});
