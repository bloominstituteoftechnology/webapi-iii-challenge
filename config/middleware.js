const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
const express=require('express');

module.exports=server=>{
    server.use(express.json())
    .use(cors())
    .use(morgan('dev'))
    .use(helmet());
}