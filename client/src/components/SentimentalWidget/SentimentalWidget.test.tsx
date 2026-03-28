import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SentimentalWidget from "./SentimentalWidget";

export function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

const submitFeedbackMock = vi.fn();
const fetchFeedbackSummaryMock = vi.fn();

vi.mock("@/api/feedback", () => ({
  submitFeedback: (...args: unknown[]) => submitFeedbackMock(...args),
  fetchFeedbackSummary: () => fetchFeedbackSummaryMock(),
}));

beforeEach(() => {
  submitFeedbackMock.mockReset();
  fetchFeedbackSummaryMock.mockReset();
});

afterEach(() => {
  cleanup();
});

describe("SentimentalWidget", () => {
  it("shows validation error when submitted without rating", async () => {
    const user = userEvent.setup();

    renderWithClient(<SentimentalWidget />);

    await user.type(
      screen.getByPlaceholderText(/enter your comment/i),
      "Nice widget",
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/please select a rating/i)).toBeInTheDocument();
  });

  it("adds a submission and updates the summary upon submit", async () => {
    const user = userEvent.setup();
    fetchFeedbackSummaryMock
      .mockResolvedValueOnce({
        totalSubmissions: 0,
        averageRating: null,
        recentComments: [],
      })
      .mockResolvedValueOnce({
        totalSubmissions: 1,
        averageRating: 4,
        recentComments: ["Hello World"],
      });

    renderWithClient(<SentimentalWidget />);
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

  it("locks the form while submission is pending", async () => {
    const user = userEvent.setup();

    let resolveSubmit!: () => void;
    submitFeedbackMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSubmit = () =>
            resolve({ message: "Feedback submitted successfully." });
        }),
    );

    renderWithClient(<SentimentalWidget />);

    await user.click(screen.getByRole("button", { name: /rate 5 out of 5/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));

    const submitButton = screen.getByRole("button", { name: /submit/i });

    screen.debug(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    resolveSubmit();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("only shows the 3 most recent comments", async () => {
    const user = userEvent.setup();

    fetchFeedbackSummaryMock
      .mockResolvedValueOnce({
        totalSubmissions: 0,
        averageRating: null,
        recentComments: [],
      })
      .mockResolvedValueOnce({
        totalSubmissions: 1,
        averageRating: 5,
        recentComments: ["test 1"],
      })
      .mockResolvedValueOnce({
        totalSubmissions: 2,
        averageRating: 5,
        recentComments: ["test 2", "test 1"],
      })
      .mockResolvedValueOnce({
        totalSubmissions: 3,
        averageRating: 5,
        recentComments: ["test 3", "test 2", "test 1"],
      })
      .mockResolvedValueOnce({
        totalSubmissions: 4,
        averageRating: 5,
        recentComments: ["test 4", "test 3", "test 2"],
      });

    renderWithClient(<SentimentalWidget />);

    for (let i = 1; i <= 4; i++) {
      await user.click(screen.getByRole("button", { name: /rate 5/i }));
      await user.type(
        screen.getByPlaceholderText(/enter your comment/i),
        `test ${i}`,
      );
      await user.click(screen.getByRole("button", { name: /submit/i }));
    }

    const summary = screen.getByRole("region", { name: /feedback summary/i });

    expect(within(summary).getByText(/test 4/i)).toBeInTheDocument();
    expect(within(summary).getByText(/test 3/i)).toBeInTheDocument();
    expect(within(summary).getByText(/test 2/i)).toBeInTheDocument();

    expect(within(summary).queryByText(/test 1/i)).not.toBeInTheDocument();
  });
});
