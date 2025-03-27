const asyncHandler = require('express-async-handler');// no need to manually mention try catch block instead use this module so that it will automatically handles the error and sends to errorHandler
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req,res) =>{
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req,res) =>{
    console.log('resquest body',req.body);
    const {name, email, phone} = req.body; //destucture the request body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name, 
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

const getContact =asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString !==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user information");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateContact)
});

const deleteContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString !==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user information");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
});


module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};