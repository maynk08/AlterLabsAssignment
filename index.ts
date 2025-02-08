import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

const app = express()


app.listen(process.env.PORT || 3000, function() {
    console.log("App is running on port " + (process.env.PORT || 3000))
});