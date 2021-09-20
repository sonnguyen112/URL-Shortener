require("dotenv").config()
const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const {Schema} = mongoose
const URLSchema = new Schema({
    _id : Number,
    url : {type : String, required : true}
}, {_id : false});
URLSchema.plugin(AutoIncrement)

const URL = mongoose.model("URL", URLSchema)
module.exports = URL