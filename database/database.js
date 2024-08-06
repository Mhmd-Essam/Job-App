const mongoose = require('mongoose'); 

 exports.dbconnection = ()=>{ 
    mongoose.connect(process.env.MONGO_URL,{
        dbName:'MERN_STACK_JOP_SEEKING'
    }).then(()=>{ 
        console.log('connected to database')
    }).catch((err)=>{ 
        console.log(`Some Error Occured while connecting to database: ${err}`); 
    })
}

