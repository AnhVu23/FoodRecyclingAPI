const bodyParser = require('body-parser');
const validator = require('validator');

module.exports =  (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(validator());
};