import express from "express";
import path from "path";
import fileUpload from './src/models/multer.js';
import { urlencoded } from "express";
import { displayMenus, newUserRegistration, orderSubmit, viewItems, viewOrders } from "./src/controllers/user.controller.js";
import { addFoodPage } from "./src/controllers/user.controller.js";
import PageRenderer from "./src/controllers/routes.js"
import expressEjsLayouts from "express-ejs-layouts";

const app = express();

const staticFilesPath = path.resolve(path.join("src", "static"));

app.use(expressEjsLayouts);
app.use("/static", express.static(staticFilesPath));

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

const renderer = new PageRenderer();
const registration = new newUserRegistration();
const newFood = new addFoodPage();
const viewItemsRenderer = new viewItems();
const displayMenusRenderer = new displayMenus();
const orderPost = new orderSubmit();
const orders = new viewOrders();

app.get("/", renderer.Home);
app.get("/menus", displayMenusRenderer.menuItems);
app.get("/login", renderer.Login);
app.get("/adminLogin", renderer.adminLogin);
app.get("/register", renderer.Register);

app.get("/checkout/:id", displayMenusRenderer.menuItem);
app.get("/loginSuccessful", registration.dashboard);
app.get("/addFood",  newFood.addFood);
app.get("/viewFood", viewItemsRenderer.Items);
app.get("/contact", renderer.contact);
app.get("/viewOrder", orders.orders);

app.post("/register", registration.registerUser);
app.post("/login", registration.userLogin);
app.post("/addFood", fileUpload.single('FoodImage'), newFood.postAddFood);
app.post("/order", orderPost.order);

export default app;