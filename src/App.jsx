import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/tasks";
import ProtectedRoute from "./helpers/protectedRoutes";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AddTaskPage from "./pages/addTask";
import EditTaskPage from "./pages/editTask";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new"
        element={
          <ProtectedRoute>
            <AddTaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:id"
        element={
          <ProtectedRoute>
            <EditTaskPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
