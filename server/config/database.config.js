const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dio-db",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log("You're now in the mainframe..."))
    .catch(err => console.log("MELTDOWN! MELTDOWN! MELTDOWN!",err))