const express = require('express');
const router = express.Router();
const request = require('request-promise-native');
const Joi = require('joi');
const config = require('config');


router.get('', (req, res) => {
    const { error } = validateInput(req.query);

    if (error) return res.status(400).send(error.details[0].message);

    const options = {
        uri: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
        qs: {
            location: req.query.location,
            key: process.env.APIKEY || config.get('apikey') // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    request(options)
    .then((response) => {
        // Return data object
        const fullLocation = response.resolvedAddress;
        const temperature = response.days[0].temp;
        const condition = response.days[0].conditions;
        const icon = response.days[0].icon;

        return res.send({
            "location": fullLocation,
            "temperature": temperature,
            "condition": condition,
            "icon": icon
        });
    })
    .catch((err) => {
        // API call failed...
        return res.status(401).send(err.message);
    });
});

function validateInput(location) {
    const schema = Joi.object({
        location: Joi.string().min(3).required()
    });

    return schema.validate(location);
}

module.exports = router;