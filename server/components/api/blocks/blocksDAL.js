'use strict';

const dal = require('../../../lib/dal');

const blocksDAL = dal.createDAL('Block');

blocksDAL.findLatest = function (amount = 1) {
  return this.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    limit: amount
  });
};
blocksDAL.findLatest = blocksDAL.findLatest.bind(blocksDAL);

blocksDAL.findByBlockNumber = function (blockNumber) {
  return this.findOne({
    where: {
      blockNumber
    },
    include: [{
      model: this.db.Transaction,
      include: [
        'Outputs', 
        {
          model: this.db.Input,
          include: ['Output']
        }
      ]
    }]
  });
};
blocksDAL.findLatest = blocksDAL.findLatest.bind(blocksDAL);

blocksDAL.addTransaction = async function(block, transaction) {
  return block.addTransaction(transaction);
};
blocksDAL.addTransaction = blocksDAL.addTransaction.bind(blocksDAL);

module.exports = blocksDAL;