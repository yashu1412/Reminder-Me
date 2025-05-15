import React, { useState } from 'react';
import axios from 'axios';

const CreateReminder = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    message: '',
    remind_via: 'email',
    email: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await axios.post('http://localhost:4000/api/v1/CreateReminder', formData);
      if (res.data.success) {
        setStatus('✅ Reminder created successfully!');
        setFormData({
          date: '',
          time: '',
          message: '',
          remind_via: 'email',
          email: '',
        });
      } else {
        setStatus('❌ Failed to create reminder');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error creating reminder');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-blue-100 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Create Reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-blue-800 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-blue-800 font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-blue-800 font-semibold">Message</label>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-blue-800 font-semibold">Remind Via</label>
            <select
              name="remind_via"
              value={formData.remind_via}
              onChange={handleChange}
              className="w-full border border-blue-300 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="email">Email</option>
              <option value="both">Both</option>
              <option value="none">None</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-blue-800 font-semibold">Email (if sending)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-blue-300 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition font-semibold"
          >
            Create Reminder
          </button>
          {status && (
            <p className="text-center text-blue-800 text-sm mt-2 font-medium">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateReminder;
