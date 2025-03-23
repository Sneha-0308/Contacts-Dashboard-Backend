const express =require('express');

const router = express.Router();

const {getContacts,createContact,getContact,updateContact,deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken); // this is used because instead of assigning each as validate you can assign whole at once
// short hand method
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact);

// router.route("/").get(getContacts);

// router.route("/").post(createContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").get(getContact);

// router.route("/:id").delete(deleteContact);

module.exports = router