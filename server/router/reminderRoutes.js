const express = require('express');
const router = express.Router();

const {
  createReminder,
  getAllReminders,
  getReminderByMessage,
  updateReminderByMessage,
  deleteReminderByMessage
} = require('../controller/reminderController');

router.post('/CreateReminder', createReminder);


router.get('/getAllReminders', getAllReminders);


router.get('/:message', getReminderByMessage);


router.put('/:message', updateReminderByMessage);

router.delete('/:message', deleteReminderByMessage);

module.exports = router;
