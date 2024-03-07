const mysql2 = require('mysql2');
const fs = require("fs")

const dbconnection = mysql2.createPool({
   port:3306,
   user: process.env.USER,
   database:process.env.DATABASE,
   host:process.env.HOST,
   password:process.env.PASSWORD,
   ssl: { ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem") },
   connectionLimit:10

})
// console.log(process.env.JWT_SECRET
//    )

// dbconnection.execute("select 'test'", (err, result) => {
//     if(err){
//         console.log(err.message)

//      }else{
//       console.log(result)

//     }



// });

module.exports = dbconnection.promise()