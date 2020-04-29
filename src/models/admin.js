const Sequelize = require('sequelize');
const bcrypt    = require('bcrypt-nodejs');
const db        = require('../config/database');

let _           = require('../utils/scripts/underscore.js');

const Admin = db.define('admin', {
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    othername:  {
        type: Sequelize.STRING,
    },
    username:  {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }, 
    password:  {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 8
        }
    }
  }, {
    // options
  });

  module.exports = Admin;