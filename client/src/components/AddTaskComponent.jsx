import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, reset } from "../features/todo/todoSlice";

const AddTaskComponent = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.todo);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("Task created successfully!");
      setTaskTitle("");
      setTaskDesc("");
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const todoData = {
      todo_name: taskTitle,
      todo_desc: taskDesc,
      todo_status: "active"
    };

    dispatch(createTodo(todoData));
  };

  return (
    <>
      <div className="flex flex-1/4 flex-col gap-2 bg-green-100 rounded-md p-4">
        <h1 className="text-green-900 font-semibold text-lg">Add Your Task</h1>
        <form onSubmit={handleAddTask} className="flex flex-col gap-3">
          <input
            type="text"
            id="taskTitle"
            placeholder="Task Title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="p-3 w-full text-white rounded-md border-gray-100 bg-green-800 shadow-xs text-sm placeholder:text-gray-300"
          />

          <textarea
            id="taskDesc"
            cols="30"
            rows="12"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="p-3 rounded-md text-sm w-full text-white border-gray-100 bg-green-800 placeholder:text-gray-300 resize-none"
            placeholder="Write your task here..."
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full px-4 py-2 text-sm text-white rounded-md bg-green-600 hover:bg-green-800 transition ease-in-out"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTaskComponent;
