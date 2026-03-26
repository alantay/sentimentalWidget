import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SentimentalWidget from "./SentimentalWidget";

let resolveSleep: () => void;

vi.mock("@/utils/sleep", () => ({
  sleep: () =>
    new Promise<void>((resolve) => {
      resolveSleep = resolve;
    }),
}));

afterEach(() => {
  cleanup();
});

describe("SentimentalWidget", () => {
  it("shows validation error when submitted without rating", async () => {
    const user = userEvent.setup();

    render(<SentimentalWidget />);

    await user.type(
      screen.getByPlaceholderText(/enter your comment/i),
      "Nice widget",
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/please select a rating/i)).toBeInTheDocument();
  });

  it("adds a submission and updates the summary upon submit", async () => {
    const user = userEvent.setup();

    render(<SentimentalWidget />);
    screen.debug();
    const summary = screen.getByRole("region", { name: /feedback summary/i });

    await user.click(screen.getByRole("button", { name: /rate 4 out of 5/i }));
    await user.type(
      screen.getByPlaceholderText(/enter your comment/i),
      "Hello World",
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      screen.getByText(/thank you for your feedback/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/total submissions: 1/i)).toBeInTheDocument();
    expect(within(summary).getByText(/hello world/i)).toBeInTheDocument();
  });

  it("locks the form for 3 seconds after submission", async () => {
    const user = userEvent.setup();

    render(<SentimentalWidget />);

    await user.click(screen.getByRole("button", { name: /rate 5 out of 5/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));

    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).toBeDisabled();

    resolveSleep!();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("only shows the 3 most recent comments", async () => {
    const user = userEvent.setup();

    render(<SentimentalWidget />);

    for (let i = 1; i <= 4; i++) {
      await user.click(screen.getByRole("button", { name: /rate 5/i }));
      await user.type(
        screen.getByPlaceholderText(/enter your comment/i),
        `test ${i}`,
      );
      await user.click(screen.getByRole("button", { name: /submit/i }));

      resolveSleep!();
    }

    const summary = screen.getByRole("region", { name: /feedback summary/i });

    expect(within(summary).getByText(/test 4/i)).toBeInTheDocument();
    expect(within(summary).getByText(/test 3/i)).toBeInTheDocument();
    expect(within(summary).getByText(/test 2/i)).toBeInTheDocument();

    expect(within(summary).queryByText(/comment 1/i)).not.toBeInTheDocument();
  });
});
