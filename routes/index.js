const express = require('express');
const router = express.Router();

const date = require('date-and-time');

const now = new Date();

router.get('', (req, res) => {
    if (req.query.loc && req.query.icon && req.query.con && req.query.temp) {
        return res.render('index', {
            title: 'Weatherly',
            location: req.query.loc,
            weather: req.query.con,
            temperature: req.query.temp,
            icon: req.query.icon,
            date: date.format(now, 'D, MMM')
        });
    }

    return res.render('index', {
        title: 'Weatherly',
        display: 'none',
    });
});

module.exports = router;