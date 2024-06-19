import { Box } from "@radix-ui/themes";
import { Title } from "./components";
import { AddTask } from "./components/AddTask";
import { TaskList } from "./components/TaskList";

export function HomePage() {
  return (
    <>
      <Box mb="4">
        <Title />
      </Box>

      <Box mb="8">
        <AddTask />
      </Box>

      <Box mb="8">
        <TaskList />
      </Box>
    </>
  );
}
