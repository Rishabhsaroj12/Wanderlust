const Review = require('../models/review');
const Listing = require("../models/listing");



module.exports.createReview = async (req, res) => {
    console.log(req.params.id);
   let listing = await Listing.findById(req.params.id);
   let newreview = new Review(req.body.review);
   newreview.author = req.user._id; // Set the author to the current user
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "New review added successfully!");

    console.log("new review added");
    res.redirect(`/listings/${listing._id}`); // Redirect to the listing page
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};