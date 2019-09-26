class ResourceController {
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

    return await this.Model.findOneAndUpdate({ _id: doc._id }, updateDoc, {
      useFindAndModify: true
    });
  }

  async delete(id, deleteDoc) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, deleteDoc, {
      useFindAndModify: true
    });
  }
}

exports.ResourceController = ResourceController;
