'use strict';
import { isValidObjectId, Types } from 'mongoose';

import CrudContainerMongo from '../../mDBContainer.js';
import env from '../../../../utils/env/env-variables.js';
import { AppErrors } from '../../../../utils/errors/error-app.js';
import CartModel from '../../../../models/cart-models.js';
import OrderModel from '../../../../models/order-model.js';

class CartMongo extends CrudContainerMongo {
  //! Check if cart exist
  async cartExist(id) {
    return await CartModel.findOne({ user: id });
  }

  //! Save products inside cart
  async addDataToCart(idBuyer, idProduct, data) {
    if (env.cartType !== undefined && env.productType !== undefined) {
      const productToAdd = await this.readAllData(env.productType, idProduct);
      const selectedCart = await this.cartExist(idBuyer);

      if (productToAdd !== null && selectedCart !== null) {
        //! Check that product is not in the list already
        const productIsOnList = await CartModel.where('_id')
          .equals(selectedCart.id)
          .where('productsList.product')
          .equals(idProduct)
          .count();

        if (productIsOnList <= 0) {
          //! Add product since is not in the list
          await CartModel.findByIdAndUpdate(
            selectedCart.id,
            { $push: { productsList: { product: idProduct, amountOrdered: data.amountOrdered } } },
            { new: true }
          );

          return `Product with ID: ${idProduct} was added to the Cart with ID: ${selectedCart.id}`;
        } else {
          const err = new AppErrors(
            `Product with ID: ${idProduct} already in the list, Update the amount instead of add same product to the Cart with ID: ${selectedCart.id}!`,
            502
          );
          throw err;
        }
      } else {
        const err = new AppErrors('Product or Cart was not Found!', 502);
        throw err;
      }
    }

    const err = new AppErrors('Collection type must be a string', 502);
    throw err;
  }

  //! GET CART INFO
  async getCartInfo(idBuyer) {
    if (idBuyer !== undefined) {
      if (isValidObjectId(idBuyer)) {
        const cartExist = await this.cartExist(idBuyer);

        if (cartExist === null) {
          //! Create a cart for the user
          return await this.addNewCart(idBuyer);
        }

        return await this.listAllProductsFromCart(idBuyer);
      }

      const err = new AppErrors('User ID must be valid', 502);
      throw err;
    }

    const err = new AppErrors('Must provide a user ID to find your cart', 502);
    throw err;
  }

  //! INSERT NEW EMPTY CART OF PRODUCTS
  async addNewCart(idUser) {
    if (env.cartType !== undefined) {
      return await this.createNewData(env.cartType, { user: idUser });
    }

    const err = new AppErrors('Collection type must be a string', 502);
    throw err;
  }

  //! ADD PRODUCTS TO CART
  async addSingleProductToCart(idBuyer, idProduct, data) {
    if (idBuyer !== undefined) {
      if (isValidObjectId(idBuyer)) {
        const cartExist = await this.cartExist(idBuyer);

        if (cartExist === null) {
          //! Create a cart for the user
          await this.addNewCart(idBuyer);
        }

        //! Add products to the new cart
        return await this.addDataToCart(idBuyer, idProduct, data);
      }

      const err = new AppErrors('User ID must be valid', 502);
      throw err;
    }

    const err = new AppErrors('Must provide a user ID to find your cart', 502);
    throw err;
  }

  //! LIST ALL PRODUCTS INSIDE CART
  async listAllProductsFromCart(idBuyer) {
    const cartHasProducts = await CartModel.aggregate([
      { $match: { user: new Types.ObjectId(idBuyer) } },
      { $project: { count: { $size: '$productsList' } } },
    ]);

    if (cartHasProducts[0].count) {
      const allProducts = await CartModel.findById(cartHasProducts[0]._id, {
        productsList: 1,
        _id: 0,
      })
        .populate('productsList.product', '-createdAt -updatedAt -__v')
        .lean();

      if (allProducts !== null) {
        return allProducts.productsList;
      } else {
        const err = new AppErrors('Error rendering the list of products inside cart', 500);
        throw err;
      }
    } else {
      return [];
    }
  }

  //! DELETE SINGLE PRODUCT BY ID FROM CART LIST
  async deleteOneProductFromCart(idBuyer, idProduct) {
    if (env.cartType !== undefined && env.productType !== undefined) {
      const productToDelete = await this.readAllData(env.productType, idProduct);
      const selectedCart = await this.readAllData(env.cartType, idBuyer);

      if (productToDelete !== null && selectedCart !== null) {
        // TODO - Verify that the product is in that list
        const productExists = await CartModel.where('_id')
          .equals(selectedCart.id)
          .where('productsList.product')
          .equals(idProduct)
          .count();

        if (productExists > 0) {
          await CartModel.findByIdAndUpdate(
            selectedCart.id,
            { $pull: { productsList: { product: idProduct } } },
            { new: true }
          );
          return `Product with ID: ${idProduct}, was deleted from the cart with ID: ${selectedCart.id}`;
        } else {
          const err = new AppErrors(
            `Product with ID: ${idProduct} can not be deleted because is not in the Cart with ID: ${selectedCart.id}`,
            502
          );
          throw err;
        }
      } else {
        const err = new AppErrors('Product or Cart was not Found!', 502);
        throw err;
      }
    }

    const err = new AppErrors('Collection type must be a string', 502);
    throw err;
  }

  //! DELETE AN EXISTING SINGLE CART
  async deleteCart(id) {
    if (env.cartType !== undefined) {
      return await this.deleteData(id, env.cartType);
    }

    const err = new AppErrors('Collection type must be a string', 502);
    throw err;
  }

  async setOrderByTheBuyer(idBuyer) {
    const result = await this.getCartInfo(idBuyer);
    if (result.length > 0) {
      const getTotalPrice = result.reduce((acc, current) => {
        return acc + current.product.productPrice * current.amountOrdered;
      }, 0);

      const getTotalProducts = result.reduce((acc, current) => {
        return acc + current.amountOrdered;
      }, 0);

      await this.deleteCart(idBuyer);

      //! Create Order
      const newOrder = new OrderModel({
        buyer: idBuyer,
        productsList: result,
        totalPrice: getTotalPrice,
        totalAmount: getTotalProducts,
      });

      newOrder.save();

      return { result, getTotalPrice, getTotalProducts };
    }

    const err = new AppErrors('Cart is empty, can not set an order', 502);
    throw err;
  }
}

export default new CartMongo();
