"use client"; // Marks this as a client component

import { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
}

async function fetchTasksFromServer() {
  const response = await fetch("http://localhost:3000/tasks", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromServer = await fetchTasksFromServer();
        setTasks(tasksFromServer);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/tasks", newTask);
      setTasks([...tasks, response.data.data]);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  };

  // Update a task
  const updateTask = async (id: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/tasks/${id}`, {
        title: editedTask.title,
        description: editedTask.description,
        status: editedTask.status,
      });
      setTasks(
        tasks.map((task) => (task.id === id ? response.data.data : task))
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${id}/status`,
        { status: newStatus }
      );

      // Update local state with the new status
      setTasks(
        tasks.map((task: any) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );

      console.log("Status updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Task Manager
      </h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border rounded-lg p-4 mb-4 flex justify-between items-start bg-white shadow"
          >
            <div className="flex-1">
              {editingTaskId === task.id ? (
                <>
                  {/* Editing Mode */}
                  <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Title:
                      </label>
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter task title"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Description:
                      </label>
                      <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter task description"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Status:
                      </label>
                      <select
                        value={editedTask.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className="border rounded w-full p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => updateTask(task.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <h2 className="font-semibold text-lg">{task.title}</h2>
                  <p className="text-gray-600 mb-1">
                    {task.description || "No description provided"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {task.status} | Created At:{" "}
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {editingTaskId === task.id ? null : (
                <>
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
