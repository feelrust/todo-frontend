import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
export default function Task(props) {
  const {
    title,
    description,
    onSave,
    onTitleChange,
    onDescriptionChange,
    isNew,
  } = props;

  const saveHandler = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="mt-4 px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">
            {isNew ? "New" : "Edit"} Task
          </h1>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center px-4 py-2 bg-gray-100 pt-10">
          <input
            name="title"
            type="text"
            placeholder="Title"
            defaultValue={title ? title : ""}
            onChange={onTitleChange}
            minLength={1}
            maxLength={15}
            required
          />
          <input
            name="Description"
            type="text"
            placeholder="Description"
            onChange={onDescriptionChange}
            defaultValue={description ? description : ""}
            maxLength={20}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveHandler}
          >
            {isNew ? "Create" : "Update"}
          </button>
          <Link className=" mb-4" to={".."}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}

Task.propTypes = {
  isNew: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onSave: PropTypes.func,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
};
