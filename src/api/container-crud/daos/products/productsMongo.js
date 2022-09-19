'use strict';
import CrudContainerMongo from '../../mDBContainer.js';
import env from '../../../../utils/env/env-variables.js';
import { AppErrors } from '../../../../utils/errors/error-app.js';

class ProductsMongo extends CrudContainerMongo {
  //! Get all products
  async getAllProducts(id) {
    if (env.productType !== undefined) {
      if (id !== undefined) {
        return await this.readAllData(env.productType, id);
      } else {
        return await this.readAllData(env.productType);
      }
    }

    const err = new AppErrors('Collection type must be a string', 502);
    throw err;
  }

  //! Insert new data product
  async addProduct(dataProduct, picture) {
    if (env.productType !== undefined) {
      return await this.createNewData(env.productType, dataProduct, picture);
    }

    const err = new AppErrors('Collection type must be an string', 502);
    throw err;
  }

  //! Update an already existing product by ID
  async updateProduct(id, data, picture) {
    if (env.productType !== undefined) {
      if (Object.entries(data).length > 0) {
        return await this.updateData(id, data, env.productType, picture);
      } else {
        const err = new AppErrors('You need to provide product data to updated the collection', 502);
        throw err;
      }
    }

    const err = new AppErrors('Collection type must be an string', 502);
    throw err;
  }

  //! Delete an existing product by ID
  async deleteSingleProduct(id) {
    if (env.productType !== undefined) {
      return await this.deleteData(id, env.productType);
    }

    const err = new AppErrors('Collection type must be an string', 400);
    throw err;
  }
}

export default new ProductsMongo();
