import { useDispatch, useSelector } from "react-redux";
import Task from "../components/task";
import { updateTask } from "../redux/taskSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../helpers/token";
import Loading from "../components/loading";
import { toast } from "react-toastify";

export default function EditTaskPage() {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const ApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const url = `${ApiUrl}/tasks/v1/${id}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id]);

  const onSaveHandler = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    const resultAction = await dispatch(updateTask({ id, title, description }));
    if (updateTask.fulfilled.match(resultAction)) {
      toast.success("Edit Task successfully");
      navigate("/");
    } else {
      toast.error("Edit Task failed");
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
      isNew={false}
      title={title}
      description={description}
      onSave={onSaveHandler}
      onTitleChange={onTitleChangeHandler}
      onDescriptionChange={onDescriptionChangeHandler}
    />
  );
}
