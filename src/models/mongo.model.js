import mongoose from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/NewUser").then(() => {
    console.log("Connected to the Database");
}).catch((err) => {
    console.log("Connection Failed" +err);
});
        
//defining schema
const userRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const menusSchema = new mongoose.Schema({
    FoodName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    FoodImage: {
        type: String,
        required: true
    }
});

 const orderSchema = new mongoose.Schema({
    orderName:{
        type: String,
        required: true
    },
    customerName:{
        type: String,
        required: true
     },
     contactNo:{
        type:Number,
        required: true
     },
     customerEmail:{
        type:String,
        required:true
     },
     quantity:{
        type:Number,
        required:true
     },
     orderMessage:{
        type:String,
        required:true
     },
     Cash:{
        type:String,
        required:true
     }
    })
     
var menus = mongoose.model('menus', menusSchema);
var User = mongoose.model('User', userRegistrationSchema);
var custOrder = mongoose.model('custOrder', orderSchema);
export {User, menus, custOrder};