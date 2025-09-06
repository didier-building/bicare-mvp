export async function fetchTasks() {
  const res = await fetch('http://localhost:3001/tasks');
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}
