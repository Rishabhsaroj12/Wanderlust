const Listing = require("../models/listing");
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
};


module.exports.renderNewform = (req, res) => {
    res.render("listings/new");
};

module.exports.showlisting = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", populate: {
                path: "author",
            }
        }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    };
    // console.log(listing);
    res.render("listings/show", { listing });
};


module.exports.createlisting = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
 
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id; // Set the owner to the current user
    newlisting.image = { url, filename };
    newlisting.geometry = response.body.features[0].geometry;
    let savedlisting =  await newlisting.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
};


module.exports.renderEditform = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    };
    let originalImage = listing.image.url; 
    originalImageurl = originalImage.replace("/upload","/upload/w_250");
    res.render("listings/edit", { listing, originalImageurl });
};


module.exports.updatelisting = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
}
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`); // Redirect to the updated listing's show page
};


module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    let deletlisting = await Listing.findByIdAndDelete(id);
    console.log(deletlisting);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};