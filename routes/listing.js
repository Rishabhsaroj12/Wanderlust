// ...existing code...
const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { listingSchema } = require("../schema.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {  storage } = require("../cloudconfig.js");
const upload = multer({ storage })

const Listing = require("../models/listing");
const { isLoggedIn, isowner, validateListing } = require("../middleware.js");

// Search listings by location
router.get("/search", wrapAsync(listingController.searchByLocation));


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createlisting)
    );

     // new route
router.get("/new", isLoggedIn, listingController.renderNewform);

router.route("/:id")
        .get( wrapAsync(listingController.showlisting))
        .put( isLoggedIn, isowner, upload.single("listing[image]"), validateListing,
         wrapAsync(listingController.updatelisting))
        .delete( isLoggedIn, isowner, wrapAsync(listingController.deletelisting));

//show edit form
router.get("/:id/edit", isLoggedIn, isowner, wrapAsync(listingController.renderEditform));


module.exports = router;