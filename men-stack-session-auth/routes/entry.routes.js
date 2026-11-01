const express = require("express");
const router = express.Router();
const isSignedIn = require("../middleware/is-signed-in.js");



const Entry = require("../models/Entry.js");


router.get("/", async (req, res) => {
    entries = await Entry.find({ isPublic: true }).populate('owner')

    res.render('entry.ejs',{ entries: entries })

})

router.get("/new", isSignedIn, async (req, res) => {
    res.render('new-entry.ejs')
})

router.post("/new", isSignedIn, async (req, res) => {
    isPublic = req.body.isPublic === "on" ? true : false
    entry = await Entry.create({
        title: req.body.title,
        entry: req.body.entry,
        isPublic: isPublic,
        owner: req.session.user._id
    });
    res.redirect('/entries');
});

router.get("/my-entries", isSignedIn, async (req, res) => {
    entries = await Entry.find({ owner: req.session.user._id }).populate('owner')
    res.render('my-entries.ejs', { entries: entries })
})

router.delete("/:id", isSignedIn, async (req, res) => {
    entry = await Entry.findById(req.params.id)
    await Entry.deleteOne({ _id: req.params.id })
    res.redirect('/entries')
})

router.get("/:id/edit", isSignedIn, async (req, res) => {
    entry = await Entry.findById(req.params.id)
    res.render('edit-entry.ejs', { entry: entry })

})

router.put("/:id", isSignedIn, async (req, res) => {
    isPublic = req.body.isPublic === "on" ? true : false
    entry = await Entry.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        entry: req.body.entry,
        isPublic: isPublic
    })
    res.redirect('/entries')
})
module.exports = router;
