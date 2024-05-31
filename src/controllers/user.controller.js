
import { authenticateuser, fileSavingToDB, newUser, saveOrderToDatabase } from "../models/user.model.js";
import { menusArr } from "../models/menu.model.js"
import path from "path"
import mongoose from 'mongoose';
import { menus, custOrder } from "../models/mongo.model.js";
let isUserLoggedIn = false;



 export class newUserRegistration{
   registerUser = async (req, res) => {
        try {
            const data = req.body;
            let response = await newUser(data);
            if(response === 1){
                
                res.render("login");
                
            }else{
                res.send("User with similar data already exists");
            }
            
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).send("Internal Server Error");
        }
    };

    userLogin = async (req,res)=>{
        
        try {
            const loginResponse = await authenticateuser(req.body);
            if(loginResponse === 0){
                isUserLoggedIn = false;
                res.send("Invalid Credentials")
            }
            else{
                isUserLoggedIn = true;
                res.render("loginSuccessful")
            }
            
            
        } catch (error) {
            console.log("Error Logging-in" + error);
            res.send("Error");
        }
    }
    

    dashboard = (req,res)=>{
        try {
            if(isUserLoggedIn === true) {
                res.render("loginSuccessful");
            }
            else {
                res.render("login");
            }
        } catch (error) {
            console.log("Error in Dashboard Path: ", error);
        }
        
    }
 }

 export class addFoodPage{
    addFood = (req,res)=>{
        if(isUserLoggedIn === true){
            res.render("addFood");
        }
        else {
            res.render("login");
        }          
    }
    postAddFood = async (req,res)=>{
        try {
             const menusFood = req.body.FoodName
              const  menusPrice =  req.body.price
              const  menusFile = req.file.filename
            
            let filePath = path.join("static", "images", menusFile)
                      let fileResponse = await fileSavingToDB(menusFood, menusPrice, menusFile)

            if(fileResponse === 1){
                menusArr.push({
                
                    FoodName: menusFood,
                    foodPrice: menusPrice,
                    FoodImage: filePath
                })
                res.render("addFood");
            }
            else{
                res.send("Error")
            }
        } catch (error) {   
            console.log(error);
            res.send(error);
        }   
    }
 }

 export class viewItems{
    async  Items (req,res){
        if (isUserLoggedIn===true){
            const menusItemFromDB = await menus.find({}).lean().exec();
          
            res.render("viewPostFood", {menusArr: menusItemFromDB})
        }
        else{
            res.render("login")
        }
    }
 }

 export class viewOrders{
    async orders (req,res){
        if(isUserLoggedIn === true){
            const orderItems = await custOrder.find({}).lean().exec();
            res.render("viewOrder", {order: orderItems})
        }
        else {
            res.render("login")
        }
    }
 }

 export class displayMenus{
    async menuItems(req, res) {
        try {
            const getMenusItem = await menus.find({}).lean().exec();
            res.render("menus", { menusItem: getMenusItem });
        } catch (error) {
            console.error("Error fetching menu items:", error);
            res.send("Error");
        }
    }

    async menuItem(req, res) {
     
            try {
                const menuItemId = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
                    return res.status(400).send("Invalid menu item ID");
                }
        
                const menuItem = await menus.findById(menuItemId).lean().exec();
        
                if (!menuItem) {
                    return res.status(404).send("Menu item not found");
                }
        
                res.render("checkout", { menuItem: menuItem });
            } catch (error) {
                console.error("Error fetching menu item:", error);
                res.status(500).send("Internal Server Error");
            }
        }
        
    
 }



export class orderSubmit{
    async order(req,res){
        try {
            const orderFoodName = req.body.orderName;
            const  customerName =  req.body.customerName;
            const  custContact = req.body.contactNo;
            const custEmail = req.body.customerEmail;
            const orderQuantity = req.body.quantity;
            const orderCustMessage = req.body.orderMessage;
            const paymentMode = req.body.Cash;
            
            const orderSavingResponse = await saveOrderToDatabase(orderFoodName, customerName, custContact, custEmail, orderQuantity, orderCustMessage, paymentMode);

            if(orderSavingResponse === 1){
                res.send("Order placed Successfully")
            }
            else{
                res.send("Order Unsuccessful");
            }
        }
        catch(err){
            console.log(err);
            res.send("Internal Server Error")
        }
    }
}

// const isAuthenticated = (req, res, next) => {
//     // Check authentication logic, for example, you can check if user session exists
//     const isLoggedIn = req.session && req.session.userId; // Adjust this according to your authentication mechanism
//     if (isLoggedIn) {
//         // If user is logged in, proceed to the next middleware
//         next();
//     } else {
//         // If user is not logged in, redirect to login page
//         res.redirect("/login");
//     }
// };