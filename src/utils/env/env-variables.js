'use strict';

export default {
  dbName: process.env.MDB_DATABASE_CONNECTION,
  productTipo: process.env.DB_TIPO_PRODUCT_COLLECTION,
  cartTipo: process.env.DB_TIPO_CART_COLLECTION,
  smtp: {
    user: String(process.env.MAIL_USER_SMTP),
    pass: String(process.env.MAIL_PASS_SMTP),
    host: String(process.env.MAIL_HOST_SMTP),
    port: Number(process.env.MAIL_PORT_SMTP),
    secure: false,
  },
  secretKeySession: process.env.SECRET_KEY_SESSION,
};
