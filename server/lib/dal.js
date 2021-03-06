'use strict';

const deepMerge = require('deepmerge');
const db = require('../db/sequelize/models');
const wrapORMErrors = require('./wrapORMErrors');

const createDAL = modelName => {
  return {
    model: modelName,
    db: db,
    async findAll(options) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .findAll(options)
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    async findById(id, options = {}) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .findById(id, options)
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    async findOne(options) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .findOne(options)
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    async count(options = {}) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .count(options)
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    async create(values = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .create(values, options)
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    async update(id, values = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .findById(id)
          .then((model) => {
            return model.update(values, deepMerge({individualHooks: true }, options));
          })
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    async delete(id, options = {}) {
      return new Promise((resolve, reject) => {
        this.db[this.model]
          .destroy(deepMerge({ where: { id: id } }, options))
          .then(resolve)
          .catch(error => {
            reject(wrapORMErrors(error));
          });
      });
    },
    toJSON(model) {
      return model.toJSON();
    },
  };
};

module.exports = { createDAL };
