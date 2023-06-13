const express = require('express');
const index = require('./routes/index');
const weather = require('./routes/weather');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || "8000";

app.use(express.json());
app.use(helmet());

// Routes
app.use('/', index);
app.use('/api/weather', weather);

// Set
app.set('view engine', 'pug');

// Set public dir
app.use(express.static('./public'));

app.keepAliveTimeout = 120 * 1000;
app.headersTimeout = 120 * 1000;

app.listen(port, () => console.log(`App is running on port ${port}`));