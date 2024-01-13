const mongoose = require('mongoose');

const connect = async () =>{
    const conn = await mongoose.connect(process.env.DB_CONNECT)
    conn ? console.log("Db Connectd !") : console.log("Db Error !")

}
connect()