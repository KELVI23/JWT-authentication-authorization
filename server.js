const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse req of content-type - application/xx-ww-form-urlencoded
app.use(express.urlencoded({extended : true}));

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to a nodeJS web application"});
});

const db  = require("./app/models");
const dbConfig = require("./app/config/dbConfig");
const Role = db.role;
  //mongodb+srv://readonly:meds.2021@cluster0.upcyw.mongodb.net/users?retryWrites=true&w=majority

db.mongoose
    .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.PORT}/${dbConfig.COLLECTION}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully conneted to MongoDb.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//creates rows in the roles colletion

function initial() {
Role.estimatedDocumentCount((err, count) => {
    if(!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if(err) {
                console.log("error", err);
            }
            console.log("added 'user' to roles olletion");
        });

        new Role({
            name: "moderator"
        }).save(err => {
                if(err) {
                console.log("error", err);
                }

            console.log("added 'adim' to roles collection");
            });
        }
    });
}

// routes
require('./app/routes/authRoutes')(app);
require('./app/routes/userRoutes')(app);

  
//set port, listen for reqs
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});


