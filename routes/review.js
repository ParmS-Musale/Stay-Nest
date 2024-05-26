const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validatereview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const {deleteReview,reviewPost}= require("../controllers/reviews.js");


router.post("/",isLoggedIn,validatereview,wrapAsync(reviewPost));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));

module.exports = router;
