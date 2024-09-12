const Sequelize = require('sequelize');
const database = require('../db');

const BookAdd = database.define('books', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

(async () => {
    await BookAdd.sync();
});

module.exports = BookAdd;