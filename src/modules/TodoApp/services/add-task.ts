import { useMutation } from "react-query";
import { api } from "src/services/api";
import { v4 } from 'uuid';

export function useAddTask() {
  async function request({ taskName }: { taskName: string }) {
    return api.post("tasks", { id: v4(), name: taskName, status: 'active' });
  }

  return useMutation({
    mutationFn: request,
  });
}
