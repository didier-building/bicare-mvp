const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export async function fetchGuides() {
  const res = await fetch(`${API_BASE_URL}/guides`);
  if (!res.ok) throw new Error('Failed to fetch guides');
  return res.json();
}
