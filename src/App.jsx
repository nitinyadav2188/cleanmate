
import React, { useState, useEffect } from "react";

const taskTemplates = ["Clean Kitchen", "Vacuum Bedroom", "Wash Dishes", "Mop Floor"];
const tips = [
  "Use vinegar + lemon for mirror shine",
  "Baking soda removes fridge odors",
  "Clean fans monthly to reduce dust",
  "Use microfiber cloths for glass cleaning"
];

export default function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [task, setTask] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [tip, setTip] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const addTask = () => {
    if (!task || !date) return;
    const newTask = { id: Date.now(), name: task, dueDate: date, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: true } : t);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">🧼 CleanMate</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-sm border px-2 py-1 rounded">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <section className="my-6 text-center">
        <h2 className="text-3xl font-semibold">Simplify Your Cleaning Routine</h2>
        <p className="text-gray-600 dark:text-gray-300">Schedule tasks, get daily tips, and stay organized.</p>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <select onChange={(e) => setTask(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-800">
            <option value="">-- Select Template --</option>
            {taskTemplates.map((tpl, i) => <option key={i}>{tpl}</option>)}
          </select>
          <input
            type="text"
            placeholder="Task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <button onClick={addTask} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Task
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-8 mb-4">Your Tasks</h3>
          {tasks.map((t) => (
            <div key={t.id} className="flex justify-between items-center border p-3 rounded mb-2 dark:border-gray-700">
              <div>
                <p className={`${t.completed ? 'line-through text-gray-400' : ''}`}>{t.name}</p>
                <small className="text-gray-500">Due: {t.dueDate}</small>
              </div>
              {!t.completed && (
                <button onClick={() => markDone(t.id)} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                  Mark Done
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-green-100 dark:bg-green-900">
          <h4 className="font-semibold text-lg">✨ Tip of the Day</h4>
          <p>{tip}</p>
        </div>
      </section>

      <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} CleanMate by Nitin Yadav
      </footer>
    </div>
  );
}
