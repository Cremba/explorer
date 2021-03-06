'use strict';
module.exports = (sequelize, DataTypes) => {
  var Output = sequelize.define(
    'Output',
    {
      lockType: DataTypes.STRING,
      contractLockVersion: DataTypes.INTEGER,
      address: DataTypes.STRING,
      addressBC: DataTypes.STRING,
      asset: DataTypes.STRING,
      amount: DataTypes.BIGINT,
      index: DataTypes.INTEGER,
    },
    {}
  );
  Output.associate = function(models) {
    Output.belongsTo(models.Transaction);
  };
  return Output;
};
