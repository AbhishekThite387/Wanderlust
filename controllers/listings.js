// const Listing = require("../routes/listing");
const Listing = require("../models/listing");

const axios = require("axios");

async function geocodeLocation(location, country) {
  const query = `${location}, ${country}`;
  const url = "https://nominatim.openstreetmap.org/search";

  const response = await axios.get(url, {
    params: {
      q: query,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "wanderlust-learning-project",
    },
  });

  if (!response.data || response.data.length === 0) {
    return null;
  }

  return {
    type: "Point",
    coordinates: [
      parseFloat(response.data[0].lon), // lng
      parseFloat(response.data[0].lat), // lat
    ],
  };
}

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exit!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// module.exports.createListing = async (req, res, next) => {
//   let url = req.file.path;
//   let filename = req.file.filename;

//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };
//   await newListing.save();
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };

// module.exports.createListing = async (req, res) => {
//   let url = req.file.path;
//   let filename = req.file.filename;

//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };

//   // ✅ ADD THIS (example: Mumbai)
//   newListing.geometry = {
//     type: "Point",
//     coordinates: [72.8777, 19.076], // [lng, lat]
//   };

// module.exports.createListing = async (req, res) => {
//   let url = req.file.path;
//   let filename = req.file.filename;

//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };

//   const geometry = await geocodeLocation(
//     req.body.listing.location,
//     req.body.listing.country,
//   );

//   if (geometry) {
//     newListing.geometry = geometry;
//   }

//   await newListing.save();
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };

module.exports.createListing = async (req, res) => {
  let url, filename;

  if (req.file) {
    url = req.file.path;
    filename = req.file.filename;
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (url && filename) {
    newListing.image = { url, filename };
  }

  const geometry = await geocodeLocation(
    req.body.listing.location,
    req.body.listing.country,
  );

  if (geometry) {
    newListing.geometry = geometry;
  } else {
    console.log("❌ Geometry not found");
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exit!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
