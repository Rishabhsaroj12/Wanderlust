const Listing = require("./models/listing");
const ExpressError = require("./utils/expressErr.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Save intended route
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isowner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next(); 
};


module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

   if (error) {
    let errorMessage = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, errorMessage);
   }
   next();
};


module.exports.validatereview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

   if (error) {
    let errorMessage = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, errorMessage);
   }
   next();
};



module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next(); 
};


