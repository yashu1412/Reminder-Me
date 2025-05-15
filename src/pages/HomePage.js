import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReminderPage = () => {
  const [reminders, setReminders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReminders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllReminders`);
      const data = await response.json();
      if (data.success) {
        setReminders(data.reminders);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const deleteReminder = async (message) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${message}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("🗑️ Reminder deleted");
        fetchReminders(); 
      } else {
        alert("❌ Failed to delete reminder");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting reminder");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const filteredReminders = reminders.filter((reminder) => {
    const query = searchQuery.toLowerCase();
    return (
      reminder.message.toLowerCase().includes(query) ||
      reminder.date.toLowerCase().includes(query) ||
      reminder.time.toLowerCase().includes(query) ||
      reminder.remind_via.toLowerCase().includes(query) ||
      (reminder.email && reminder.email.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700 dark:text-indigo-300">
          All Reminders
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search any field..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full md:w-1/2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add Reminder Button */}
        <div className="flex justify-end mb-4">
          <Link to="/addreminder">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500">
              + Add Reminder
            </button>
          </Link>
        </div>

        {/* Reminder Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Remind Via</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-300">
              {filteredReminders.length > 0 ? (
                filteredReminders.map((reminder, index) => (
                  <tr key={index} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="px-4 py-3">{reminder.date}</td>
                    <td className="px-4 py-3">{reminder.time}</td>
                    <td className="px-4 py-3">{reminder.message}</td>
                    <td className="px-4 py-3 capitalize">{reminder.remind_via}</td>
                    <td className="px-4 py-3">{reminder.email || "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteReminder(reminder.message)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No reminders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReminderPage;
