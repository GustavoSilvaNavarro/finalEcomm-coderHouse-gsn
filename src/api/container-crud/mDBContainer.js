'use strict';
import { isValidObjectId } from 'mongoose';
import fs from 'fs-extra';

import ProductModel from '../../models/product-models.js';
import CartModel from '../../models/cart-models.js';
import { uploadImage } from '../../utils/upload-images/cloudinary.js';
import { AppErrors } from '../../utils/errors/error-app.js';

//! BASIC CRUD
class CrudContainerMongo {
  //! Create new data
  async createNewData(collectionType, data, picture) {
    let newData;

    if (collectionType === 'product') {
      newData = new ProductModel(data);
      if (picture) {
        const result = await uploadImage(picture.path, 'products');

        newData.productPicture = {
          productPicUrl: result.secure_url,
          public_id: result.public_id,
        };

        await fs.unlink(picture.path);
      }
    } else if (collectionType === 'cart') {
      newData = new CartModel();
    } else {
      const err = new AppErrors('Collection type must be product or cart as values', 502);
      throw err;
    }

    await newData.save();
    return newData._id;
  }

  //! READ DATA
  async readAllData(collectionType, id) {
    let anyDataRead;

    if (collectionType === 'product') {
      if (id !== undefined) {
        if (isValidObjectId(id)) {
          anyDataRead = await ProductModel.findById(id);
        } else {
          const err = new AppErrors('Please enter a valid ID for Product', 502);
          throw err;
        }
      } else {
        anyDataRead = await ProductModel.find({}).lean();
      }

      if (anyDataRead !== null) {
        return anyDataRead;
      } else {
        const err = new AppErrors('Product was not Found', 502);
        throw err;
      }
    } else if (collectionType === 'cart') {
      if (id !== undefined) {
        if (isValidObjectId(id)) {
          anyDataRead = await CartModel.findById(id);
        } else {
          const err = new AppErrors('Please enter a valid ID for Cart', 502);
          throw err;
        }
      } else {
        anyDataRead = await CartModel.find({});
      }

      if (anyDataRead !== null) {
        return anyDataRead;
      } else {
        const err = new AppErrors('Cart was not Found', 502);
        throw err;
      }
    } else {
      const err = new AppErrors('Collection type must be product as value', 502);
      throw err;
    }
  }

  //! Update data
  async updateData(id, data, collectionType) {
    if (id !== undefined) {
      if (isValidObjectId(id)) {
        if (collectionType === 'product') {
          const product = await ProductModel.findById(id);

          if (product !== null) {
            Object.assign(product, data);
            await product.save();

            return `Product with ID: ${id} was updated!`;
          }

          const err = new AppErrors('Product was not Found', 502);
          throw err;
        } else if (collectionType === 'cart') {
          const cart = CartModel.findById(id);

          if (cart !== null) {
            Object.assign(cart, data);
            await cart.save();

            return `Cart with ID: ${id} was updated!`;
          }

          const err = new AppErrors('Cart was not Found!', 502);
          throw err;
        }

        const err = new AppErrors('Collection type must be cart as value', 400);
        throw err;
      } else {
        const err = new AppErrors('The ID must be valid!', 502);
        throw err;
      }
    } else {
      const err = new AppErrors('Must have an ID to update the data', 502);
      throw err;
    }
  }

  //! Delete Data
  async deleteData(id, collectionType) {
    if (id !== undefined) {
      if (isValidObjectId(id)) {
        if (collectionType === 'product') {
          const productDeleted = await ProductModel.findByIdAndDelete(id);

          if (productDeleted !== null) {
            return `Product with ID: ${id} was deleted!`;
          }

          const err = new AppErrors('Product not Found!', 502);
          throw err;
        } else if (collectionType === 'cart') {
          const cartDeleted = await CartModel.findByIdAndDelete(id);

          if (cartDeleted !== null) {
            return `Cart with ID: ${id} was deleted`;
          }

          const err = new AppErrors('Cart was not Found!', 502);
          throw err;
        }

        const err = new AppErrors('Collection type must be product or cart as values', 502);
        throw err;
      }

      const err = new AppErrors('The ID must be valid!', 502);
      throw err;
    } else {
      const err = new AppErrors('Need an ID to delete a product', 502);
      throw err;
    }
  }
}

export default CrudContainerMongo;
