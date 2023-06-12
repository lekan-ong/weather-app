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
            location: req.query.loc,
            weather: req.query.con,
            temperature: req.query.temp,
            icon: req.query.icon,
            date: now.getDate() + ', ' + month
        });
    }

    return res.render('index', {
        title: 'Weatherly',
        display: 'none',
    });
});

module.exports = router;