module.exports = (io) => {
    io.on("connection", socket => {
        socket.on("added-user", data => {
            console.log("Coming from client", data.id)
            io.emit(`update-tc`,{id: data.id})
        })
    })
}