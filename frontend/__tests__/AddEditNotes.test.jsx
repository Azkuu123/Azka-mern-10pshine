jest.mock("react-quill-new");
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddEditNotes from "../src/pages/Home/AddEditNotes";

describe("AddEditNotes Component", () => {
  const mockClose = jest.fn();
  const mockGetAllNotes = jest.fn();
  const mockToast = jest.fn();

  test("shows error if title is empty", () => {
    render(
      <AddEditNotes
        type="add"
        getAllNotes={mockGetAllNotes}
        onClose={mockClose}
        showToastMessage={mockToast}
      />
    );

    const saveBtn = screen.getByTestId("save-note-button");
    fireEvent.click(saveBtn);

    expect(screen.getByText(/please enter the title/i)).toBeInTheDocument();
  });

  test("shows error if content is empty", () => {
    render(
      <AddEditNotes
        type="add"
        getAllNotes={mockGetAllNotes}
        onClose={mockClose}
        showToastMessage={mockToast}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/write your note title here/i), {
      target: { value: "My Note" },
    });

    const saveBtn = screen.getByTestId("save-note-button");
    fireEvent.click(saveBtn);

    expect(screen.getByText(/please enter the content/i)).toBeInTheDocument();
  });
});
