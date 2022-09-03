const express = require('express');
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware.
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);

//default response for any other request (not found).
app.use((req,res)=>{
    res.status(404).end();
});

// start server after DB connection.
db.connect(err=>{
    if (err) throw err;
    console.log('database connected');
    app.listen(PORT, ()=>{
        console.log(`Server Running on Port ${PORT}`);
    });
});