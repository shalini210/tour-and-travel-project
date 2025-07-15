const express = require('express');
const router = express.Router();
const Destination = require('../models/destination');
const upload = require('../middleware/upload');

router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const imagePaths = req.files.map(file => file.path);
        const destination = await Destination.create({ ...req.body, imagePaths });
        res.json(destination);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const destinations = await Destination.find();
    res.json(destinations);
});
// Get by ID
router.get('/:id', async (req, res) => {
  const dest = await Destination.findById(req.params.id);
  res.json(dest);
});

// Update by ID
router.put('/:id', upload.array('images', 10), async (req, res) => {
  const imagePaths = req.files ? req.files.map(file => file.path) : [];
  const updated = await Destination.findByIdAndUpdate(
    req.params.id,
    { ...req.body, ...(imagePaths.length && { imagePaths }) },
    { new: true }
  );
  res.json(updated);
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  res.json({ message: 'Destination deleted' });
});

module.exports = router;
