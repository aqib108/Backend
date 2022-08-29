// const dotenv = require("dotenv");
// const  Router  = require("express");
const express = require ("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(cookieParser());

// Route imports

const  requisition = require("./routes/RequisitionRoute");

const  vendors = require("./routes/UserRoute");

const  bids = require("./routes/BidRoute");

const  categories = require("./routes/CategoryRoute");

const  dashboard = require("./routes/DashboardRoute");

const  orders = require("./routes/OrderRoute");

const  review = require("./routes/OrderReviewRoute");

const  chats = require("./routes/ChatRoute");

app.use("/api/v2", requisition);

app.use("/api/v2/bid", bids);

app.use("/api/v2", vendors);

app.use('/api/v2/order' , orders)

app.use('/api/v2/category' , categories)

app.use('/api/v2/chat' , chats)

app.use('/api/v2/review' , review)

app.use('/api/v2/dashboard' , dashboard)

app.use(ErrorHandler);
module.exports = app



// // dotenv.config({path:"./config.env"});

// // require("../db/conn");

// // const Vendor = require ('./modals/vendorsModel');

// app.use( express.json());

// // we link Router files
// app.use(require('../router/vendorsAuth'));

// const PORT= process.env.PORT;

// app.get('/', (req, res) => {
//     res.send('server says hello');
// });

// // console.log('server is running at port ');

// app.get('/about', (req, res)=>{
//     res.send('server says hello to about');
// });

// app.get('/contact', (req, res)=>{
//     res.send('server says hello to contact');
// });

// app.get('/login', (req, res)=>{
//     res.send('server says hello to login');
// });

// app.get('/signup', (req, res)=>{
//     res.send('server says hello to signup');
// });

// app.listen(PORT, ()=>{
//     console.log('server is running at: '+process.env.PORT);
// })

