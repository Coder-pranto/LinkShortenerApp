require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express()
const connectDatabase = require('./dbConfig/databaseConfig');

const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;
const urlRouter = require('./routes/urlRoutes');


app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(urlRouter);

//* default

app.get('/',(req, res)=>{
  res.send('hello from Link Shortening server.... :)');
})



//* handling error route

app.use((req, res, next)=>{
    res.status(404).json({message : "route not found !"});
})


//* handling sever side error

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({message: "Some thing is broke!"})
})

app.listen(port, ()=>{
    console.log(`>Server is up and running on : http://localhost:${port} `.green.bgWhite);
    connectDatabase();
})