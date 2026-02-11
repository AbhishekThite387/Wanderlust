const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("../models/listing");

// 🔹 MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

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

  if (!response.data || response.data.length === 0) return null;

  return {
    type: "Point",
    coordinates: [
      parseFloat(response.data[0].lon), // lng
      parseFloat(response.data[0].lat), // lat
    ],
  };
}

async function addGeometryToListings() {
  const listings = await Listing.find({ geometry: { $exists: false } });

  console.log(`Found ${listings.length} listings`);

  for (let listing of listings) {
    const geometry = await geocodeLocation(listing.location, listing.country);

    if (geometry) {
      listing.geometry = geometry;
      await listing.save();
      console.log("✅ Updated:", listing.title);
    } else {
      console.log("❌ Failed:", listing.title);
    }
  }

  mongoose.connection.close();
}

addGeometryToListings();
