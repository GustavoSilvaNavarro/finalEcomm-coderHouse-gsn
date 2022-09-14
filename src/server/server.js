import express from 'express';

const app = express();

app.set('port', process.env.PORT || 8080);

export default { app };
