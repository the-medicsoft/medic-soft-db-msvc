const { HttpCode } = require('../utils');

class BaseModel {
  constructor(model) {
    this.Model = model;

    // remove _id and _v properties from resultset
    this.filter = '-_id -__v -password';
  }

  async create(body) {
    const resource = new this.Model(body);
    return await this.Model.create(resource);
  }

  async read() {
    return await this.Model.find({}, this.filter);
  }

  async readByQuery(query) {
    return await this.Model.find(query, this.filter);
  }

  async update(id, updateDoc) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, updateDoc);
  }

  async delete(id, deleteDoc) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, deleteDoc);
  }

  success(total, data, message) {
    return DbResult(
      true,
      HttpCode[200].code,
      HttpCode[200].statusText,
      total,
      data,
      message
    );
  }

  created(total, data, message) {
    return DbResult(
      true,
      HttpCode[201].code,
      HttpCode[201].statusText,
      total,
      data,
      message
    );
  }

  notFound(message) {
    throw DbResult(
      false,
      HttpCode[404].code,
      HttpCode[404].statusText,
      undefined,
      undefined,
      message || HttpCode[404].statusText
    );
  }

  conflict(message) {
    throw DbResult(
      false,
      HttpCode[409].code,
      HttpCode[409].statusText,
      undefined,
      undefined,
      message
    );
  }

  fail(message) {
    throw DbResult(
      false,
      HttpCode[500].code,
      HttpCode[500].statusText,
      undefined,
      undefined,
      message
    );
  }
}

function DbResult(isSuccess, statusCode, statusText, total, data, message) {
  class DbResult {
    constructor(isSuccess, statusCode, statusText, total, data, message) {
      this.success = isSuccess;
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.total = total;
      this.data = data;
      this.message = message;
    }
  }

  return Object.freeze(
    new DbResult(isSuccess, statusCode, statusText, total, data, message)
  );
}

exports.BaseModel = BaseModel;
