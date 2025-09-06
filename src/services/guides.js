export async function fetchGuides() {
  const res = await fetch('http://localhost:3001/guides');
  if (!res.ok) throw new Error('Failed to fetch guides');
  return res.json();
}
