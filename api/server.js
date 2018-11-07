console.log("ran the server");

module.exports={
    listen: (port, callback) => {
        console.log("ran the server");
        callback();
    }
}