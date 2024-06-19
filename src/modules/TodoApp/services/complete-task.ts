import { useMutation } from "react-query";
import { api } from "src/services/api";
import { Task } from "src/types/task";

export function useCompleteTask() {
  async function request({ taskId, status }: { taskId: string; status: Task['status'] }) {
    return api.put(`tasks/${taskId}`, { status });
  }

  return useMutation({
    mutationFn: request,
  });
}
