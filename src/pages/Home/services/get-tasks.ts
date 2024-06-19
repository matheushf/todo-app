import { useQuery } from "react-query";
import { api } from "src/services/api";
import { Task } from "src/types/task";

type TaskResponse = Task[];

export function useGetTasks({ enabled } = { enabled: false }) {
    async function request() {
        return new Promise<Promise<TaskResponse>>(async res => {
            setTimeout(() => {
                res(api.get<TaskResponse>('tasks'));
            }, 500);
        })
    }
    
    return useQuery({
        queryKey: ['get-tasks'],
        queryFn: request,
        enabled
    });
}