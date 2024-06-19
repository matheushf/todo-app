import { QueryClient, QueryClientProvider } from "react-query";
import { Box } from "@radix-ui/themes";
import { Theme } from "@radix-ui/themes";
import { Title } from "./components";
import { AddTask } from "./components/AddTask";
import { TaskList } from "./components/TaskList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function TodoApp() {
  return (
    <Theme
      accentColor="violet"
      grayColor="sand"
      panelBackground="solid"
      appearance="dark"
    >
      <QueryClientProvider client={queryClient}>
        <Box mb="4">
          <Title />
        </Box>

        <Box mb="8">
          <AddTask />
        </Box>

        <Box mb="8">
          <TaskList />
        </Box>
      </QueryClientProvider>
    </Theme>
  );
}
