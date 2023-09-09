const express = require('express');
const router = express.Router();

router.post('/addStatusPost', (req, res) => {
    res.send('ahihi')
});

module.exports = router;
