import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useAddTask } from "../services/add-task";
import { useGetTasks } from "../services/get-tasks";

const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [hasError, setHasError] = useState(false);
  const addTask = useAddTask();
  const { refetch: refetchTasks, isFetching, isLoading } = useGetTasks();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
    if (!event.target.value) setHasError(true);
    else setHasError(false);
  }

  function handleSubmit() {
    if (!taskName) return setHasError(true);
    setHasError(false);

    addTask.mutate(
      { taskName },
      {
        onSuccess: () => {
            refetchTasks();
            setTaskName('');
        },
      }
    );
  }

  return (
    <Flex width="100%" align="center" justify="center" gap="4">
      <TextField.Root placeholder="Task name" onChange={handleInputChange} value={taskName} color={hasError ? 'red' : undefined} variant={hasError ? 'soft' : undefined}>
        <TextField.Slot>
          <PlusIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button onClick={handleSubmit} disabled={isFetching && !isLoading} loading={isFetching && !isLoading}>Add task</Button>
    </Flex>
  );
};

export { AddTask };
