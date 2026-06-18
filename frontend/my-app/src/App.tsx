import { useState, useEffect } from "react";
import type { Task } from "./types";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadTasks() {
    try {
      setTasks(await getTasks());
      setError("");
    } catch {
      setError("Não consegui carregar as tarefas. O backend está rodando?");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit() {
    if (!title.trim()) return;
    try {
      if (editingId !== null) {
        await updateTask(editingId, { title, description, done: false });
      } else {
        await createTask({ title, description, done: false });
      }
      resetForm();
      loadTasks();
    } catch {
      setError("Erro ao salvar a tarefa.");
    }
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch {
      setError("Erro ao excluir a tarefa.");
    }
  }

  async function toggleDone(task: Task) {
    try {
      await updateTask(task.id, { ...task, done: !task.done });
      loadTasks();
    } catch {
      setError("Erro ao atualizar a tarefa.");
    }
  }

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Task-Flow</h1>
          <p className="text-slate-500 mt-1">
            {tasks.length} tarefa{tasks.length !== 1 ? "s" : ""} •{" "}
            {completed.length} concluída{completed.length !== 1 ? "s" : ""}
          </p>
        </header>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            {editingId !== null ? "Editar tarefa" : "Nova tarefa"}
          </h2>
          <div className="flex flex-col gap-3">
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Descrição (opcional)"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId !== null ? "Salvar alterações" : "Adicionar tarefa"}
              </button>
              {editingId !== null && (
                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-slate-100 text-slate-600 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Pending tasks */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            A fazer ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <p className="text-slate-400 text-sm">Nenhuma tarefa pendente.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {pending.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleDone(task)}
                  onEdit={() => startEdit(task)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Completed tasks */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Concluídas ({completed.length})
            </h2>
            <div className="flex flex-col gap-3">
              {completed.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleDone(task)}
                  onEdit={() => startEdit(task)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow ${
        task.done ? "opacity-60" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={onToggle}
        className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium text-slate-800 ${
            task.done ? "line-through text-slate-400" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-slate-500 mt-0.5">{task.description}</p>
        )}
      </div>
      <div className="flex gap-1 shrink-0">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default App;