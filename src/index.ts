import express from "express";
import http from 'http';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(cors({
    credentials:true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, ()=>{
    console.log("Server is running on http://localhost:8080/");
});

const MONGO_URI = "mongodb://127.0.0.1:27017";

mongoose.Promise=Promise;

mongoose.connect(MONGO_URI);
mongoose.connection.on('error', (error: Error)=> console.log(error));

app.use('/', router());

