const {ToughChoice,User, Choice} = require("../models/tc.model");

module.exports = {
    createToughChoice: (req,res) => {
        ToughChoice.findOne({title:req.body.title})
            .then(tc => {
                console.log("This doesn't something", tc);
                if(tc){
                    console.log("IT already exists")
                    res.json({msg:"exists"})

                }
                else{
                    console.log("THis is body:" + req.body)
                    ToughChoice.create(req.body)
                        .then(tc => {
                            console.log("This is new tough choice", + tc);
                            res.json(tc)
                        })
                        .catch(err => res.json(err))

                }
            })
            .catch(err => res.json(err));
    },
    showToughChoice: (req,res) => {
        ToughChoice.findOne({title:req.params.title})
            .then(tc => res.json(tc))
            .catch(err => res.json(err))
    },
    endToughChoice:(req,res) => {
        ToughChoice.findByIdAndUpdate(req.paramns.id,req.body)
            .then(tc => res.json(tc))
            .catch(err => res.json(err))
            
    },
    addUser: (req,res) => {
        ToughChoice.findOne({title:req.params.title})
            .then(tc => {
                if(tc.active){
                    
                    User.create(req.body)
                        .then(newUser => {
                            ToughChoice.findOneAndUpdate({title:req.params.title},{$push:{users:newUser}})
                                .then(updated =>  res.json({tc:updated,userId:newUser._id}))
                                .catch(err => res.json(err))
                        })
                        .catch(err => res.json(err))
                }
                else res.json({msg:"none"})
            })
            .catch(err => res.json(err))
    },
    updateUser: (req,res) => {
        
        console.log(req.body)
        Choice.create(req.body.choice)
            .then(choice => {
                const {updated} = req.body;
                updated.choices.push(choice)
            
                User.findByIdAndUpdate(req.params.userId,updated,{useFindAndModify:false})
                    .then(updatedUser => {
                        console.log("Made it into heer");
                        ToughChoice.findOneAndUpdate({title: req.params.title},{$pull:{users:{_id: updatedUser._id}}},{useFindAndModify:false})
                            .then(tc => {
                                User.findById(updatedUser._id)
                                    .then(user => {
                                        ToughChoice.findOneAndUpdate({title: req.params.title},{$push:{users:user}},{useFindAndModify:false})
                                            .then(tc => resjson(tc))
                                            .catch(err => res.json(err))

                                    })
                                    .catch(err => res.json(err))
                            })
                            .catch(err => res.json(err))
                    })
                    .catch(err => res.json(err))
            })
            .catch(err => console.log(err));
    },
    deactivate: (req,res) => {
        ToughChoice.findOneAndUpdate({title:req.params.title},{active: false})
            .then(tc => res.json(tc))
            .catch(err => res.json(err));
    }
}