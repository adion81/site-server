const mongoose = require("mongoose");

const ChoiceSchema =  new mongoose.Schema({
    message:{
        type: String
    }
},{timestamps:true})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"Name is required."],
        minlength:[3,"Name must be at least 3 characters."]
    },
    initials:{
        type:String,
        required:[true,"Initials are required."],
        minlength:[2,"Initials must be 2 characters."],
        maxlength:[2,"Initials must be 2 characters."]
    },
    color:{
        type:String,
        required:[true,"Color must have a value"]
    },
    teen:{
        type: Boolean,
        default: true
    },
    twins:{
        type: Boolean,
        default:true
    },
    dog :{
        type:Boolean,
        default:true
    },
    money:{
        type: Number
    },
    goodWill:{
        type: Number
    },
    paydayLoan:{
        type: Number,
        default: 0
    },
    position:{
        type: String,
        default: "home"
    },
    choices:[ChoiceSchema]

},{timestamps:true})


const ToughChoiceSchema = new mongoose.Schema({
    title:{
        type: String,
        requrired:[true,"Title is required."]
    },
    active: {
        type: Boolean,
        default: true
    },
    users: [UserSchema]
},{timestamps:true})

const Choice = mongoose.model("Choice",ChoiceSchema);
const User = mongoose.model("User",UserSchema);
const ToughChoice = mongoose.model("ToughChoice",ToughChoiceSchema);

module.exports.Choice = Choice;
module.exports.User = User;
module.exports.ToughChoice = ToughChoice;
