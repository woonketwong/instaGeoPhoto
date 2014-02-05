module.exports = function() {
    //Home routes
    var index = require('../server/app/controllers/index');
    app.get('/', index.render);
};
