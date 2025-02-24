fetch("biomes.geojson") // Update with your actual file path
  .then((response) => response.json())
  .then((geojsonData) => {
    window.alert("GeoJSON loaded:", geojsonData);
    checkUserBiome(geojsonData);
  })
  .catch((error) => window.alert("Error loading GeoJSON:", error));

  function getUserLocation(callback) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.longitude, position.coords.latitude];
          window.alert("User coordinates:", userCoords);
          callback(userCoords);
        },
        (error) => window.alert("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    } else {
      window.alert("Geolocation not supported");
    }
  }

  import * as turf from "@turf/turf";

  function checkUserBiome(geojsonData) {
    getUserLocation((userCoords) => {
      const userPoint = turf.point(userCoords);
  
      let foundBiome = "Unknown Biome";
  
      for (const feature of geojsonData.features) {
        if (turf.booleanPointInPolygon(userPoint, feature.geometry)) {
          foundBiome = feature.properties.name || "Unnamed Biome";
          break;
        }
      }
  
      window.alert("User is in:", foundBiome);
    });
  }
  