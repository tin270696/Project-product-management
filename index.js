const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
// End Flash

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

// Routes
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});