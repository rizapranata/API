'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    userId: DataTypes.INTEGER
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};