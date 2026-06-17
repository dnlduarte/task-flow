import { useState, useEffect } from "react";
import type { Task } from "./types";
import { getTasks, createTask } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setTasks(await getTasks());
      setError("");
    } catch (e) {
      setError("Não consegui carregar as tarefas. O backend está rodando?");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate() {
    if (!title.trim()) return;
    try {
      await createTask({ title, description, done: false });
      setTitle("");
      setDescription("");
      loadTasks();
    } catch (e) {
      setError("Erro ao criar tarefa.");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Taskboard</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>Adicionar tarefa</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}
          >
            <strong>{task.title}</strong>
            {task.description && <p style={{ margin: "4px 0 0" }}>{task.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;