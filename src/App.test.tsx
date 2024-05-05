import {
  render,
  screen,
  userEvent,
  fireEvent,
  waitFor,
  within,
} from "./test/utils";
import App from "./App";

describe("App", () => {
  beforeEach(async () => {
    const { getByRole } = render(<App />);
    await waitFor(() => expect(getByRole("table")).toBeInTheDocument());
  });

  it("should filter candidates when selecting a position", async () => {
    await fireEvent.click(screen.getAllByText("Position Applied")[0]);
    await fireEvent.click(screen.getAllByText("Engineer")[0]);

    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(29);
  });

  it("should filter candidates when searching by name", async () => {
    const input: HTMLInputElement = screen.getByTestId("search-by-name-input");

    await userEvent.type(input, "Tiago");
    await new Promise((r) => setTimeout(r, 100)); // Wait for debounce.

    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(2); // Header + 1 record.
  });
});
