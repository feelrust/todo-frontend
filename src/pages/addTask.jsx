import { useDispatch, useSelector } from "react-redux";
import Task from "../components/task";
import { addTask } from "../redux/taskSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { toast } from "react-toastify";

export default function AddTaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.task);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSaveHandler = async () => {
    if (!title || title === "") {
      toast.error("Title is required");
      return;
    }
    const resultAction = await dispatch(addTask({ title, description }));
    if (addTask.fulfilled.match(resultAction)) {
      toast.success("Add Task successfully");
      navigate("/");
    } else {
      toast.error("Add Task failed");
    }
  };

  const onTitleChangeHandler = (ev) => {
    setTitle(ev.target.value);
  };

  const onDescriptionChangeHandler = (ev) => {
    setDescription(ev.target.value);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Task
      isNew={true}
      onSave={onSaveHandler}
      onTitleChange={onTitleChangeHandler}
      onDescriptionChange={onDescriptionChangeHandler}
    />
  );
}
