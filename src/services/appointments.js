export async function fetchNextAppointment() {
  const res = await fetch('http://localhost:3001/appointments');
  if (!res.ok) throw new Error('Failed to fetch appointments');
  const data = await res.json();
  return data[0] || null;
}
