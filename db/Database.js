const mongoose = require ("mongoose");

const connectDatabase =() =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    }).then((data)=>{
        console.log('mongodb is connected with server:'+data.connection.host)
    })

}

module.exports = connectDatabase

// const db = process.env.DATABASE;

// mongoose.connect(db , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
    
// }).then(() =>{
//     console.log('connection succesfull');
// }).catch((error) => console.log(error.message));
