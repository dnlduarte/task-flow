import type { Task } from "../types";

const BASE_URL = "http://localhost:8080/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Erro ao criar tarefa");
  return res.json();
}