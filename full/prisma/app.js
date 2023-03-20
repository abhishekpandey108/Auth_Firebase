const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/api.route')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())
app.get('/', async(req,res,next)=>{
    res.send({message:'Its working '})
})

app.use('/api',routes);

app.use((req,res,next)=>{
    next(createError.NotFound());
})


app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        message:err.message,
        status:err.status
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`);
})