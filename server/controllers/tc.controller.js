const {ToughChoice,User, Choice} = require("../models/tc.model");

module.exports = {
    createToughChoice: (req,res) => {
        ToughChoice.create(req.body)
            .then(tc => res.json(tc))
            .catch(err => res.json(err))
    },
    showToughChoice: (req,res) => {
        ToughChoice.findById(req.params.id)
            .then(tc => res.json(tc))
            .catch(err => res.json(err))
    },
    endToughChoice:(req,res) => {
        ToughChoice.findByIdAndUpdate(req.paramns.id,req.body)
            .then(tc => res.json(tc))
            .catch(err => res.json(err))
            
    },
    addUser: (req,res) => {
        ToughChoice.findById(req.params.id)
            .then(tc => {
                if(tc.active){
                    
                    User.create(req.body)
                        .then(newUser => {
                            ToughChoice.findByIdAndUpdate(req.params.id,{$push:{users:newUser}})
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
        console.log("USER ID: ", req.params.userId);
        console.log("TC ID: ", req.params.tcId);
        console.log(req.body)
        Choice.create(req.body.choice)
            .then(choice => {
                const {updated} = req.body;
                updated.choices.push(choice)
            
                User.findByIdAndUpdate(req.params.userId,updated,{useFindAndModify:false})
                    .then(updatedUser => {
                        console.log("Made it into heer");
                        ToughChoice.findByIdAndUpdate({_id: req.params.tcId},{$pull:{users:{_id: updatedUser._id}}})
                            .then(tc => {
                                User.findById(updatedUser._id)
                                    .then(user => {
                                        ToughChoice.findByIdAndUpdate({_id: req.params.tcId},{$push:{users:user}})
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
    }
}