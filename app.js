const Express = require("express");
const Mongoose = require("mongoose");
const models = require("./models/users");
const Cors = require("cors");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./models/users");

let app = Express();

app.use(Express.json());
app.use(Cors());

Mongoose.connect(
  "mongodb://athulkrishnapanamakkal:athul123@ac-pikpijl-shard-00-00.wjtqgxj.mongodb.net:27017,ac-pikpijl-shard-00-01.wjtqgxj.mongodb.net:27017,ac-pikpijl-shard-00-02.wjtqgxj.mongodb.net:27017/blogAppDb?ssl=true&replicaSet=atlas-a3e10y-shard-0&authSource=admin&appName=Cluster0",
);



//signin
app.post("/signIn", async (req, res) => {
    let input = req.body;
    let result = userModel.find({ email: req.body.email }).then(
        (items)=>{
            if(items.length>0){
                const passwordvalidator = Bcrypt.compareSync(req.body.password, items[0].password);
                if(passwordvalidator){
                  jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                    (err,token)=>{
                      if(err){
                        res.json({"Status":"error","errorMessage":err})
                        }else{
                            res.json({"Status":"success","token":token,"userId":items[0]._id})
                      }
                    })
                }  else{
                    res.json({"Status":"Invalid password"})
                }


        }else{
            res.json({"Status":"Invalid email-id"})
        }
})

});



//signup
app.post("/signup", async (req, res) => {
  let input = req.body;
  let hashedPassword = Bcrypt.hashSync(req.body.password, 10);
  console.log(hashedPassword);
  req.body.password = hashedPassword;

  userModel
    .find({ email: req.body.email })
    .then((items) => {
      if (items.length > 0) {
        res.json({ message: "User already exists" });
      } else {
        let result = new userModel(input);
        result.save();
        res.json({ status: "success" });
      }
    })
    .catch((error) => {});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
