require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose } = require('./config/mongoose');
const api = require('./api/routes/apiRoutes');

const port = process.env.PORT || 3000;

app = express();
require('./middleware/appMiddleware')(app);
//Setup the routes
app.use('/api', api);
app.use(express.static('public'));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};