const axios = require('axios');

const geocodeLocation = async (location) => {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}`;

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'DisasterTrackerApp'
    }
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("Location not found for geocoding");
  }

  const { lat, lon } = response.data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
};

module.exports = geocodeLocation;
