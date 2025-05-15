const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const reminderRoutes = require('./router/reminderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use('/api/v1', reminderRoutes);

app.get('/', (req, res) => {
  res.send("Remind-me-later API is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
