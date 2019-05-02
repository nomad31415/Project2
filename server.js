#!/usr/bin/env node
'use strict';

require('dotenv').config({silent: true});




var port = process.env.PORT || 3000;

var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/post-api-routes.js")(app);
require("./routes/author-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});








function close() {
  app.close();
}

module.exports = {
  close: close
};
