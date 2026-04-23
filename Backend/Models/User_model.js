const mongoose = require("mongoose");

let userSchema = {
  emailid: {
    type: String,
    required: true,
    unique: true
  },

  pwd: {
    type: String,
    required: true
  },

  userType: {
    type: String,
    enum: ["customer", "tailor"],
    required: true
  },

  name: String,
  phone: String,
 


}
var ver={
    versionKey:false,
    timestamps: true
}

let schemakey=mongoose.Schema;
let collectionschema=new schemakey(userSchema,ver);
let usermodel=mongoose.model("users",collectionschema);
module.exports={usermodel};