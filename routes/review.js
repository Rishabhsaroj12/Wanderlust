const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows us to access params from the parent route
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/expressErr.js");
const Review = require("../models/review.js");
const { validatereview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Listing = require("../models/listing.js");
const reviewcontroller = require("../controllers/reviews.js");


//reviwes post route
router.post("/",isLoggedIn, validatereview, wrapAsync(reviewcontroller.createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewcontroller.deleteReview));

module.exports = router;