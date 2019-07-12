module.exports = validateUserId

function validateUserId(error, req, res, next) {
    const { id } = req.params;
  
    console.log('hello')

    
  
    if(error) {
        console.log('error')
        req.body = id;
        next();
    } else {
        console.log('else')
         next(400).json({message: "Correct ID!"})
    }
  
    next();
  };  