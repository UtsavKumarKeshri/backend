import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {menus, User, custOrder} from "../models/mongo.model.js"


export const newUser = async (registrationData) => {
    const userRegistrationDetails = new User(registrationData);
        const existingUser = await User.findOne({email: registrationData.email})
        if(existingUser){
            return 0;
        }

        else{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userRegistrationDetails.password, saltRounds);
            userRegistrationDetails.password = hashedPassword;

            const userSignup = await User.insertMany(userRegistrationDetails)
            
            
            return 1;
        }
    
};

export const authenticateuser = async (newUserLoginData)=>{

    try {
        const checkUser = await User.findOne({email:newUserLoginData.email})
        let isLoginAuth = 0;
        if(!checkUser){
            isLoginAuth = 0;
            return isLoginAuth;   
        }
        const isPasswordMatch = bcrypt.compare(newUserLoginData.password, checkUser.password);
        if(isPasswordMatch){
            isLoginAuth = 1
            return isLoginAuth;
        }
        else{
            isLoginAuth = 0
            return isLoginAuth;
        }
       } catch (error) {
        
       }

}


export const fileSavingToDB  = async (menusFood, menusPrice, menusFile)=>{
    try {
        
        const menuData= new menus({
            FoodName: menusFood,
            price: menusPrice,
            FoodImage: menusFile
        })
        
        const saveMenuForm = await menus.insertMany(menuData);
        return 1;
        
    } catch (error) {
        console.log("Failed to save file to the database"+error);
        return 0;
    }
}

export const saveOrderToDatabase = async(orderFoodName, customerName, custContact, custEmail, orderQuantity, orderCustMessage, paymentMode)=>{
    try {
        const orderData= new custOrder({
            orderName: orderFoodName,
            customerName: customerName,
            contactNo: custContact,
            customerEmail: custEmail,
            quantity:orderQuantity,
            orderMessage: orderCustMessage,
            Cash: paymentMode
        })
        const saveOrderDetails = await custOrder.insertMany(orderData);
        return 1;
        
    } catch (error) {
        console.log("Order Failed", error);
        return 0;
    }
}