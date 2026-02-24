import { useEffect, useState } from "react";
import { fetchPosts, addPost, updatePost, deletePost } from "./api";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // create form
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert("Failed to load posts. Check backend URL / CORS.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await addPost(name, message);
      setName("");
      setMessage("");
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to add post.");
    }
  }

  function startEdit(post) {
    setEditingId(post.id);
    setEditName(post.name);
    setEditMessage(post.message);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditMessage("");
  }

  async function saveEdit(id) {
    try {
      await updatePost(id, editName, editMessage);
      cancelEdit();
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to update post.");
    }
  }

  async function handleDelete(id) {
    const ok = confirm("Delete this post?");
    if (!ok) return;

    try {
      await deletePost(id);
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to delete post.");
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Guestbook</h1>
      <p>React (frontend) → NestJS API → Supabase</p>

      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input
            style={{ flex: 1, padding: 10 }}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <textarea
          style={{ width: "100%", padding: 10, minHeight: 90 }}
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div style={{ marginTop: 10 }}>
          <button type="submit" style={{ padding: "10px 14px" }}>
            Post
          </button>
        </div>
      </form>

      <hr />

      <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {!loading && posts.length === 0 && <p>No posts yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #333",
              borderRadius: 8,
              padding: 12,
            }}
          >
            {editingId === post.id ? (
              <>
                <input
                  style={{ width: "100%", padding: 10, marginBottom: 10 }}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <textarea
                  style={{ width: "100%", padding: 10, minHeight: 80 }}
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                />
                <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => saveEdit(post.id)}
                    style={{ padding: "8px 12px" }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    style={{ padding: "8px 12px" }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <strong>{post.name}</strong>
                <p style={{ marginTop: 8 }}>{post.message}</p>
                <small>{new Date(post.created_at).toLocaleString()}</small>

                <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => startEdit(post)}
                    style={{ padding: "8px 12px" }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    style={{ padding: "8px 12px" }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}