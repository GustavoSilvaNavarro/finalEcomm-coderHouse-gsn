import 'dotenv/config';

import connectionToServer from './server/server.js';

const { app } = connectionToServer;

app.listen(app.get('port'), () => {
  console.log(`Server on Port: ${app.get('port')} - Worker: ${process.pid}`);
});
