const joi = require("joi");

const userSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password:joi.string().min(6).required(),
});

const validateUser = (req,res,next) =>{
    const { error } = userSchema.validate(req.body);
    if(error){
        res.status(400);
        throw new Error("Invalide input");
    }   
    next();
};

module.exports = {validateUser};