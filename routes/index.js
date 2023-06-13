const express = require('express');
const router = express.Router();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const now = new Date();
const month = monthNames[now.getMonth()];


router.get('', (req, res) => {
    if (req.query.loc && req.query.icon && req.query.con && req.query.temp) {
        return res.render('index', {
            title: 'Weatherly',
        });
    }

    return res.render('index', {
        title: 'Weatherly',
        display: 'none',
        date: now.getDate() + ', ' + month
    });
});

module.exports = router;