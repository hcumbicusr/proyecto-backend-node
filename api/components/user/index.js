// const store = require('../../../store/dummy');
const config = require('../../../config');
if ( config.remoteDB === true) {
    const store = require('../../../store/remote-mysql');
} else {
    const store = require('../../../store/mysql');
}
const ctrl = require('./controller');

module.exports = ctrl(store);