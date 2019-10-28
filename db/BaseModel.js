const { dbResultSetFilter } = require('../config/config');
const { HttpCode } = require('../utils');

class BaseModel {
  constructor(model) {
    this.Model = model;

    // remove _id and _v properties from resultset
    this.filter = dbResultSetFilter;
  }

  async create({ body }) {
    const resource = new this.Model(body);
    return await this.Model.create(resource);
  }

  async read() {
    return await this.Model.find({}, this.filter);
  }

  async readByQuery({ query }) {
    return await this.Model.find(query, this.filter);
  }

  async update({ id, body }) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, body);
  }

  async delete({ id, deleteDoc }) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, deleteDoc);
  }

  success({ total, data, message } = {}) {
    return DbResult({
      isSuccess: true,
      statusCode: HttpCode[200].code,
      statusText: HttpCode[200].statusText,
      total: total,
      data: data,
      message: message
    });
  }

  created({ total, data, message } = {}) {
    return DbResult({
      isSuccess: true,
      statusCode: HttpCode[201].code,
      statusText: HttpCode[201].statusText,
      total: total,
      data: data,
      message: message
    });
  }

  notFound({ message } = {}) {
    throw DbResult({
      isSuccess: false,
      statusCode: HttpCode[404].code,
      statusText: HttpCode[404].statusText,
      total: undefined,
      data: undefined,
      message: message || HttpCode[404].statusText
    });
  }

  conflict({ message } = {}) {
    throw DbResult({
      isSuccess: false,
      statusCode: HttpCode[409].code,
      statusText: HttpCode[409].statusText,
      total: undefined,
      data: undefined,
      message: message
    });
  }

  fail({ message } = {}) {
    throw DbResult({
      isSuccess: false,
      statusCode: HttpCode[500].code,
      statusText: HttpCode[500].statusText,
      total: undefined,
      data: undefined,
      message: message
    });
  }
}

function DbResult({ isSuccess, statusCode, statusText, total, data, message }) {
  class DbResult {
    constructor({ isSuccess, statusCode, statusText, total, data, message }) {
      this.success = isSuccess;
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.total = total;
      this.data = data;
      this.message = message;
    }
  }

  return Object.freeze(
    new DbResult({ isSuccess, statusCode, statusText, total, data, message })
  );
}

exports.BaseModel = BaseModel;
