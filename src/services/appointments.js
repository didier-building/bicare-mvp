const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export async function fetchNextAppointment() {
  const res = await fetch(`${API_BASE_URL}/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  const data = await res.json();
  return data[0] || null;
}
