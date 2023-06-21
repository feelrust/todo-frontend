import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/tasks";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AddTaskPage from "./pages/addTask";
import EditTaskPage from "./pages/editTask";
import AdminPage from "./pages/admin";
import ProtectedLayout from "./pages/layout/protectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<TasksPage />} />
        <Route path="/new" element={<AddTaskPage />} />
        <Route path="/:id" element={<EditTaskPage />} />
      </Route>
      <Route path="/admin" element={<ProtectedLayout role="Admin" />}>
        <Route index element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
