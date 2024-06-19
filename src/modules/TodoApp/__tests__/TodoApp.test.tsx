import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoApp } from "../TodoApp";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function renderPage() {
  render(
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

describe("TodoApp", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the title", () => {
    renderPage();

    const titleElement = screen.getByText("A Twodo list");
    expect(titleElement).toBeInTheDocument();
  });

  it("should add a task", async () => {
    renderPage();

    const button = screen.getByRole("button");
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Task 1");
    await userEvent.click(button);

    expect(input).toHaveValue("");
    expect(await screen.findByText("Task 1")).toBeInTheDocument();
  });

  it("should render a list of tasks", async () => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        { id: "1", name: "task1" },
        { id: "2", name: "task2" },
      ])
    );
    renderPage();

    expect(await screen.findByText("task1")).toBeInTheDocument();
    expect(await screen.findByText("task2")).toBeInTheDocument();
  });

  it("should filter on the list of tasks", async () => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        { id: "1", name: "task1", status: "active" },
        { id: "2", name: "task2", status: "completed" },
      ])
    );
    renderPage();

    await userEvent.click(screen.getByText('Active'));
    expect(await screen.findByText("task1")).toBeInTheDocument();
    expect(screen.queryByText("task2")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Completed'));
    expect(await screen.findByText("task2")).toBeInTheDocument();
    expect(screen.queryByText("task1")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('All'));
    expect(await screen.findByText("task2")).toBeInTheDocument();
    expect(await screen.findByText("task1")).toBeInTheDocument();
  });
});
