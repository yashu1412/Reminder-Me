const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
  remind_via: {
    type: String,
    enum: ['email'], 
    required: true
  },
  email: { type: String }
});

reminderSchema.methods.getDateTime = function() {
  return new Date(`${this.date}T${this.time}:00`);
};

reminderSchema.statics.findRemindersDue = async function() {
  const now = new Date();

  const window24hStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const window2hStart = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const fiveMinutes = 5 * 60 * 1000;

  const reminders = await this.find().exec();

  return reminders.filter(reminder => {
    const reminderTime = reminder.getDateTime().getTime();

    const is24hDue = reminderTime >= (window24hStart.getTime() - fiveMinutes) &&
                     reminderTime <= (window24hStart.getTime() + fiveMinutes);

    const is2hDue = reminderTime >= (window2hStart.getTime() - fiveMinutes) &&
                    reminderTime <= (window2hStart.getTime() + fiveMinutes);

    return is24hDue || is2hDue;
  });
};

module.exports = mongoose.model('Reminder', reminderSchema);
