const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mern-games",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log("You're now in the mainframe..."))
    .catch(err => console.log("MELTDOWN! MELTDOWN! MELTDOWN!",err))