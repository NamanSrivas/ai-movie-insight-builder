import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    p: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
  },
}));

describe("SearchBar", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("renders the search input", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    expect(
      screen.getByPlaceholderText(/enter imdb id/i)
    ).toBeInTheDocument();
  });

  it("renders the Analyze button", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    expect(screen.getByText("Analyze")).toBeInTheDocument();
  });

  it("shows error for empty input on submit", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    fireEvent.click(screen.getByText("Analyze"));
    expect(screen.getByText(/please enter an imdb id/i)).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("shows error for invalid IMDb ID format", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/enter imdb id/i);
    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.click(screen.getByText("Analyze"));
    expect(screen.getByText(/invalid format/i)).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("calls onSearch with a valid IMDb ID", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/enter imdb id/i);
    fireEvent.change(input, { target: { value: "tt0133093" } });
    fireEvent.click(screen.getByText("Analyze"));
    expect(mockOnSearch).toHaveBeenCalledWith("tt0133093");
  });

  it("renders example movie quick-pick buttons", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
  });

  it("triggers search when clicking an example movie", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    fireEvent.click(screen.getByText("The Matrix"));
    expect(mockOnSearch).toHaveBeenCalledWith("tt0133093");
  });

  it("disables input when loading", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
    expect(screen.getByPlaceholderText(/enter imdb id/i)).toBeDisabled();
  });
});
