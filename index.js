const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const moment = require("moment");
const path = require("path");

dotenv.config();
database.connect();

const systemConfig = require("./config/system");
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser('ABCDE'));
app.use(session({ cookie: {maxAge: 60000} }));
app.use(flash());

// Set Pug
app.set('view engine', 'pug');
app.set('views', './views');

// file tĩnh
app.use(express.static('public'));

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join('node_modules', 'tinymce')));

// Routes
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});