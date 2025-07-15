const express = require('express');
const router = express.Router();
const Package = require('../models/package');
const upload = require('../middleware/upload');

router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const imagePaths = req.files.map(file => file.path);
        const pack = await Package.create({ ...req.body, imagePaths });
        res.json(pack);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const packages = await Package.find();
    res.json(packages);
});
// Get by ID
router.get('/:id', async (req, res) => {
  const pack = await Package.findById(req.params.id);
  res.json(pack);
});

// Update by ID
router.put('/:id', upload.array('images', 10), async (req, res) => {
  const imagePaths = req.files ? req.files.map(file => file.path) : [];
  const updated = await Package.findByIdAndUpdate(
    req.params.id,
    { ...req.body, ...(imagePaths.length && { imagePaths }) },
    { new: true }
  );
  res.json(updated);
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: 'Package deleted' });
});

module.exports = router;
