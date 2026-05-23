const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

// Create new event (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, date } = req.body;
  if (!title || !date) return res.status(400).json({ message: 'Title and date required' });

  try {
    const event = new Event({ title, description, date });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
