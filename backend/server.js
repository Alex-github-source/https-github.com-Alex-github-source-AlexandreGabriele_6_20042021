const http = require('http');
const app = require('./app');

const normalizePort = val => {    //configuration du port de connexion en fonction de l'environnement
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');//choix du port de connexion (env ou localhost:3000)
app.set('port', port);

const errorHandler = error => {   //fonction qui permet de gérer les erreurs
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); //creation du serveur express

server.on('error', errorHandler);//lance le serveur et affiche les erreurs (s'il y en a)
server.on('listening', () => { //ecouteur d'evenement qui enregistre le port sur lequel le serveur s'execute
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); //le serveur ecoute le port
