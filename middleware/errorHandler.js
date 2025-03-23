const {constants} = require('../constant');

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ||500;
    console.log("status code>>>",res.statusCode);
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation failed",message: err.message, stackTrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message: err.message, stackTrace:err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorized",message: err.message, stackTrace:err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"not found",message: err.message, stackTrace:err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"Internal Server error",message: err.message, stackTrace:err.stack});
            break;
        default:
            console.log("No error! All looks good"); 
            break;   
    }

    console.log(statusCode);
    res.json({message: err.message, stackTrace:err.stack});
}

module.exports = errorHandler;