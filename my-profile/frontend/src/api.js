const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function fetchPosts() {
  const res = await fetch(`${API}/api/guestbook`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function addPost(name, message) {
  const res = await fetch(`${API}/api/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
}

export async function updatePost(id, name, message) {
  const res = await fetch(`${API}/api/guestbook/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API}/api/guestbook/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}