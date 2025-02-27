const Contact = require('../models/Contact')
const asyncHandler = require('express-async-handler')

// @desc Get all contacts
// @route GET /api/contacts
// @access public

const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
});

// @desc Create all contacts
// @route POST /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, designation} = req.body
        if (!name || !email || !phone || !designation) {
            res.status(400)
            throw new Error("All fields are requiered")
        }
        const contact = await Contact.create({ name, email, phone, designation})
        res.status(201).json(contact);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// @desc Get one contact
// @route GET /api/contacts/:id
// @access public

const getOneContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("contact not found !")
    }
    res.status(200).json(contact)
})

// @desc Update one contact
// @route PUT /api/contacts/:id
// @access public

const updateContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("contact not found !")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
})

// @desc delete one contact
// @route DELETE /api/contacts/:id
// @access public

const deleteContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("contact not found !")
    }
    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json({message: `Delete one contact for ${req.params.id}`})
})

module.exports = { getContacts, createContact, getOneContact, updateContact, deleteContact }