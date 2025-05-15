const Reminder = require('../model/reminder');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log('Error with email config:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { date, time, message, remind_via, email } = req.body;

    const reminder = new Reminder({ date, time, message, remind_via, email });
    const saved = await reminder.save();

    // Send email if required
    if ((remind_via === 'email' || remind_via === 'both') && email) {
      await transporter.sendMail({
        from: process.env.MAIL_USER || 'yashpalsinghpawara@gmail.com',
        to: email,
        subject: 'Reminder Notification',
        text: 
`***** REMINDER NOTIFICATION *****

You have an important reminder scheduled!

MESSAGE: ${message.toUpperCase()}
DATE: ${date}
TIME: ${time}

Please make sure to take the necessary action.

Thank you,
Your Reminder Service
`

      });
    }

    res.status(201).json({ success: true, reminder: saved });
  } catch (err) {
    console.error("Error creating reminder:", err);
    res.status(500).json({ success: false, message: "Failed to create reminder" });
  }
};

// Get all reminders
exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, reminders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reminders" });
  }
};

// Get reminder by message
exports.getReminderByMessage = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ message: req.params.message });
    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }
    res.status(200).json({ success: true, reminder });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reminder" });
  }
};

// Update reminder by message
exports.updateReminderByMessage = async (req, res) => {
  try {
    const { date, time, remind_via, email } = req.body;
    const updated = await Reminder.findOneAndUpdate(
      { message: req.params.message },
      { date, time, remind_via, email },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }
    res.status(200).json({ success: true, reminder: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update reminder" });
  }
};

// Delete reminder by message
exports.deleteReminderByMessage = async (req, res) => {
  try {
    const deleted = await Reminder.findOneAndDelete({ message: req.params.message });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }
    res.status(200).json({ success: true, message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete reminder" });
  }
};
