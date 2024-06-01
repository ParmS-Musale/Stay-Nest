const Listing = require ("./models/listing");
const Review = require ("./models/review");
const ExpressError = require ("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./Schema.js");

module.exports.isLoggedIn = (req ,res, next)=>{
    if (!req.isAuthenticated ()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You Must Be Login in to Creating New Listing" );
        return res.redirect("/login");
      } 
      next ();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if (req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next ();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect('/listings');
  }

  if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req,res, next)=>{
    let {error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
  };

  module.exports.validatereview = (req,res, next)=>{
    let {error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
  };

  module.exports.isReviewAuthor = async (req, res, next)=>{
    let { id ,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    console.log(res.locals.currUser._id);
    if (!review.author.equals(res.locals.currUser._id)){
      req.flash ("error" ,"You Are Not author of This review..!!");
      return res.redirect(`/listings/${id}`);
    }
    next();
};