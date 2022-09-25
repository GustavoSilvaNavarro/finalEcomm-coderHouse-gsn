'use strict';
import CartMDB from '../api/container-crud/daos/carts/cartsMongo.js';
import sendEmail from '../utils/mails/nodemailer.js';
import { sendTextMessages } from '../utils/messages/twilio.js';
import env from '../utils/env/env-variables.js';
import logger from '../config/logs/loggers.js';

//!GET - See my cart list
export const renderCartList = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Rendering cart page`);
  try {
    const { firstName, lastName } = req.user;

    //TODO - check the cart exist
    const response = await CartMDB.getCartInfo(req.user._id);

    if (Array.isArray(response)) {
      const totalPrice = response.reduce((acc, current) => {
        return acc + current.product.productPrice * current.amountOrdered;
      }, 0);

      const totalAmount = response.reduce((acc, current) => {
        return acc + current.amountOrdered;
      }, 0);

      res.status(200).render('cart/new-cart', { response, totalPrice, totalAmount, firstName, lastName });
      return;
    }

    res.status(200).render('cart/new-cart', { firstName, lastName });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! PUT - Add an specific Product by ID to an specific Cart by userID
export const addProductsToCart = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Adding a product to the cart`);
  try {
    await CartMDB.addSingleProductToCart(req.user._id, req.params.idProduct, req.body); //TODO send message
    res.status(200).redirect('/api/carts');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! DELETE - Find specific cart by user ID and delete single product by ID
export const deleteSingleProduct = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Deleting one product from Cart List`);
  try {
    await CartMDB.deleteOneProductFromCart(req.user._id, req.params.idProduct); //TODO send message
    res.status(200).redirect('/api/carts');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! POST - Set new order and delete temporary cart to save the order
export const setNewOrder = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Deleting one product from Cart List`);
  try {
    const resp = await CartMDB.setOrderByTheBuyer(req.user._id);

    const listOfProducts = resp.result.map(el => {
      return el.product.productName;
    });

    const html = `
    <h1>New User: ${req.user.firstName} ${req.user.lastName} with Email: ${req.user.email} set new Order</h1>
    <h3>List of Products</h3>
      <p>${listOfProducts.join(', ')}</p>
      <p><span style="font-weight: bold;">Total Price: </span> ${resp.getTotalPrice} USD</p>
      <p><span style="font-weight: bold;">Amount of Products: </span> ${resp.getTotalProducts} Units</p>

      <p>Thanks for your purchase</p>
    `;

    const mailOptions = {
      from: 'NodeJs Server',
      to: env.smtp.user,
      subject: 'New Order was setup',
      html,
    };

    //! Sending email
    await sendEmail(mailOptions);

    //! Sending Whatsapp
    const newWhatsaap = `
      New User: ${req.user.firstName} ${req.user.lastName} with Email: ${req.user.email} set new Order
      List of Products
      ${listOfProducts.join(', ')}

      Total Price: ${resp.getTotalPrice} USD
      Amount of Products: ${resp.getTotalProducts} Units

      Thanks for your purchase!
    `;

    await sendTextMessages(env.whatsappTwilio, newWhatsaap, `whatsapp:${req.user.cellphone}`);

    //! Send Text Message
    const body = 'Order received!!\n\nIn few minutes we will be preparing your order.\n\nThanks for your purchase.';
    await sendTextMessages(env.adminPhoneNumber, body, req.user.cellphone);

    res.status(200).redirect('/');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
