const Sequelize = require('sequelize');

module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: require('../utils/constants').DB_PATH
});