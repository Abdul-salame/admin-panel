
import { Mail, User, Calendar, Trash2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("gmi_messages")) || [];
    setMessages(stored);
  }, []);

  const saveMessages = (updated) => {
    setMessages(updated);
    localStorage.setItem("gmi_messages", JSON.stringify(updated));
  };

  const markAsRead = (index) => {
    const updated = [...messages];
    updated[index].read = true;
    saveMessages(updated);
  };

  const deleteMessage = (index) => {
    if (!confirm("Delete this message?")) return;
    const updated = messages.filter((_, i) => i !== index);
    saveMessages(updated);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl shadow border transition
                ${msg.read ? "bg-gray-50" : "bg-white border-blue-200"}
              `}
            >
              <div className="flex justify-between items-start gap-6">
                <div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-2">
                      <User size={16} /> {msg.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail size={16} /> {msg.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />{" "}
                      {new Date(msg.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg">
                    {msg.subject}
                  </h3>
                  <p className="text-gray-700 mt-2">
                    {msg.message}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(i)}
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                      <CheckCircle size={16} />
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(i)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
