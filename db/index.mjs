import mongoose from "mongoose";

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/selfservice')

export default conn