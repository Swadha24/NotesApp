import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    const res = await fetch(`${API}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async () => {
    if (!text.trim()) return;

    if (editId === null) {
      await fetch(`${API}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
    } else {
      await fetch(`${API}/notes/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      setEditId(null);
    }

    setText("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/notes/${id}`, {
      method: "DELETE"
    });

    fetchNotes();
  };

  const editNote = (note) => {
    setText(note.text);
    setEditId(note._id);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Notes App</h1>
        <p className="subtitle">Simple MERN CRUD Project</p>

        <div className="inputRow">
          <input
            type="text"
            placeholder="Write a note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={saveNote}>
            {editId === null ? "Add" : "Update"}
          </button>
        </div>

        <div className="notes">
          {notes.length === 0 ? (
            <p className="empty">No notes yet</p>
          ) : (
            notes.map((note) => (
              <div className="noteCard" key={note._id}>
                <span>{note.text}</span>

                <div className="btns">
                  <button
                    className="edit"
                    onClick={() => editNote(note)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;