import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTask,
  deleteTask,
  getTasks,
  incompleteTask,
} from "../redux/taskSlice";
import TaskAction from "../components/tasksAction";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
import { toast } from "react-toastify";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCheck = (e, id) => {
    if (e.target.checked) {
      dispatch(completeTask(id));
    } else {
      dispatch(incompleteTask(id));
    }
  };

  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteTask(id));
    if (deleteTask.fulfilled.match(resultAction)) {
      toast.success("Delete Task successfully");
    } else {
      toast.error("Delete Task failed");
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-screen-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="mt-4 px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <div className="flex items-center justify-end mr-4 border-b-2 border-teal-500 py-2">
        <Link
          to="/new"
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Add Task
        </Link>
      </div>
      <ul className="divide-y divide-gray-200 px-4">
        {data.map((task, index) => (
          <li key={index} className="py-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e) => handleCheck(e, task.id)}
                checked={task.isComplete}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label className="ml-3 block text-gray-900">
                <span className="text-lg font-medium">{task.title}</span>
                <span className="text-sm ml-3 font-light text-gray-500">
                  {task.description}
                </span>
              </label>
            </div>
            <div className="w-full flex justify-end gap-3">
              <TaskAction
                id={task.id.toString()}
                onDelete={() => handleDelete(task.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
