'use strict';
import CrudContainerMongo from '../../mDBContainer.js';
import env from '../../../../utils/env/env-variables.js';
import { AppErrors } from '../../../../utils/errors/error-app.js';
// import CartModels from '../../../../models/cart-models.js';

class CartMongo extends CrudContainerMongo {
  //! INSERT NEW EMPTY CART OF PRODUCTS
  async addNewCart() {
    if (env.cartType !== undefined) {
      return await this.createNewData(env.cartType);
    }

    const err = new AppErrors('Collection type must be a string', 400);
    throw err;
  }
}

export default new CartMongo();
