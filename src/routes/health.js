const express = require('express');
const router = express.Router();

// Retornar status do server
router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is running...' });
});

module.exports = router;
