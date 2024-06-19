import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoApp } from "./modules/TodoApp/TodoApp";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo-app/home" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
}
