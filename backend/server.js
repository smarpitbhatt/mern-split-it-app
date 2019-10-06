var mongoose = require('mongoose');
const userRouter = require('./routes/usersRoute');
const transactionRouter = require('./routes/transactionRoute');
var app = require('./config/appConfig');
require('./config/passport');
require('dotenv').config();

const port = process.env.PORT || 5000;

/** 
        Atlas Connection
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:  true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
.catch((err)=>console.log("ERROR WHILE CONNECTING TO DB"));

/**  ---   */

app.get('/', ( req, res)=>{

 console.log("Index / ");
 res.send("Done");

});

app.use('/user', userRouter);
app.use('/transaction', transactionRouter);


app.listen(port, ()=>console.log(`Server up and Running port: ${port}`));