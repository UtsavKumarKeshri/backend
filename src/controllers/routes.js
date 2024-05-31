export default class PageRenderer{
    Home = (req, res)=>{
        res.render('home');
    };
    contact = (req, res)=>{
        res.render('contact');
    };

    checkout = (req,res)=>{
        res.render('checkout');
    };

    Login = (req,res)=>{
        res.render("login");
    };
    adminLogin = (req,res)=>{
        res.render("adminLogin");
    };

    Register = (req, res)=>{
        res.render("register");
    };  

    
    // viewFood = (req, res)=>{
    //     res.render("viewFood");
    // };  


    
    // postSuccessfulLogin = (req,res)=>{
    //     res.render("loginSuccessful");
    // }
}

