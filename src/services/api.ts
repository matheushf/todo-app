import { Task } from "src/types/task";

type API = {
  get: <T>(path: string) => Promise<T>;
  post: (path: string, payload: unknown) => Promise<{ ok: boolean }>;
  put: (path: string, payload: Pick<Task, 'status'>) => Promise<{ ok: boolean }>;
  delete: (path: string) => Promise<{ ok: boolean }>;
};

export const api: API = {
  get: (path: string) => {
    return new Promise((res, rej) => {
      try {
        const response = localStorage.getItem(path);

        res(JSON.parse(response || "[]"));
      } catch (error) {
        console.log(error);
        rej({ ok: false });
      }
    });
  },
  post: (path: string, payload: unknown) => {
    return new Promise(async (res, rej) => {
      try {
        const existent = await api.get<string[]>(path);

        localStorage.setItem(path, JSON.stringify([...existent, payload]));
        res({ ok: true });
      } catch (error) {
        console.log(error);
        rej({ ok: false });
      }
    });
  },
  put: (completePath: string, payload: Pick<Task, 'status'>) => {
    return new Promise(async (res, rej) => {
      try {
        const [path, id] = completePath.split('/');
        const existent = await api.get<Task[]>(path);
        const task = existent.find(task => task.id === id);

        if (task) {
            task.status = payload.status;
        }

        localStorage.setItem(path, JSON.stringify(existent));
        res({ ok: true });
      } catch (error) {
        console.log(error);
        rej({ ok: false });
      }
    });
  },
  delete: (path: string) => {
    return new Promise((res, rej) => {
      try {
        localStorage.removeItem(path);
        res({ ok: true });
      } catch (error) {
        console.log(error);
        rej({ ok: false });
      }
    });
  },
};
