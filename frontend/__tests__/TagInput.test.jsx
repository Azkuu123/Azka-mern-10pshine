import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TagInput from "../src/components/Input/TagInput";

describe("TagInput Component", () => {
  test("adds a new tag when Enter is pressed", () => {
    const mockSetTags = jest.fn();
    const tags = [];

    render(<TagInput tags={tags} setTags={mockSetTags} />);

    const input = screen.getByTestId("tag-input");
    fireEvent.change(input, { target: { value: "urgent" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockSetTags).toHaveBeenCalledWith(["urgent"]);
  });

  test("removes tag when X button clicked", () => {
    const mockSetTags = jest.fn();
    const tags = ["work"];

    render(<TagInput tags={tags} setTags={mockSetTags} />);

    const removeBtn = screen.getAllByTestId("remove-tag")[0];
    fireEvent.click(removeBtn);

    expect(mockSetTags).toHaveBeenCalledWith([]);
  });
});
