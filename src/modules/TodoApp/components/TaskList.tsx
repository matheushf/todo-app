import {
  Card,
  Checkbox,
  Flex,
  RadioGroup,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { useGetTasks } from "../services/get-tasks";
import { useCompleteTask } from "../services/complete-task";
import { Task } from "src/types/task";
import { useState } from "react";

const TaskList = () => {
  const [filterStatus, setFilter] = useState("all");
  const {
    data: tasks,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetTasks({ enabled: true });
  const { mutate } = useCompleteTask();

  function onComplete(taskId: string, status: Task["status"]) {
    mutate(
      { taskId, status: status === "active" ? "completed" : "active" },
      { onSuccess: () => refetch() }
    );
  }

  function onFilter(status: string) {
    setFilter(status);
  }

  if (isError) {
    return <Text>Sorry, something happened.</Text>;
  }

  return (
    <Flex
      width="100%"
      justify="center"
      align="center"
      direction="column"
      gap="4"
    >
      <Flex direction="row" justify="center" align="center" asChild gap="4">
        <RadioGroup.Root
          defaultValue="1"
          name="example"
          variant="surface"
          onClick={(ev: any) => onFilter(ev.target.value)}
        >
          <RadioGroup.Item value="all">All</RadioGroup.Item>
          <RadioGroup.Item value="active">Active</RadioGroup.Item>
          <RadioGroup.Item value="completed">Completed</RadioGroup.Item>
        </RadioGroup.Root>
      </Flex>

      {isLoading && <Spinner />}

      {!isLoading &&
        (tasks || []).map(
          (task, index) =>
            (task.status === filterStatus || filterStatus === "all") && (
              <Card key={task.name + index} style={{ width: "80%" }}>
                <Flex align="center" gap="2">
                  <Checkbox
                    checked={task.status === 'completed'}
                    size="3"
                    disabled={isFetching}
                    onClick={() => onComplete(task.id, task.status)}
                  />
                  <Text>{task.name}</Text>
                </Flex>
              </Card>
            )
        )}

      {!isLoading && isFetching && <Spinner />}
    </Flex>
  );
};

export { TaskList };
