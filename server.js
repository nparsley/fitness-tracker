//server.js

//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/fitness-tracker/dist/fitness-tracker'));

app.get('/*', (request,response) => {
  response.sendFile(path.join(__dirname+'/fitness-tracker/dist/fitness-tracker/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
