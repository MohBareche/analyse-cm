const map = L.mapbox
  .map("mapDIV", null, { zoomControl: false })
  .setView([45.55, -73.66], 10);
const zoomHome = L.Control.zoomHome().addTo(map);
// L.control.locate().addTo(map);
L.mapbox.accessToken =
  "pk.eyJ1IjoibWJhcmVjaGUiLCJhIjoiY2pkbHpqZjQ3MGVibzJycWhka203dDNtYiJ9.GLpfZW2gcYULhuIa6vwgFw";

// L.mapbox.accessToken =
//   "pk.eyJ1IjoiYWJlbmZhdHRvdW0iLCJhIjoiY2ozY3l6MWV5MDAwZjMybnc0NmdhNDBpeSJ9.oYZEToeffGVafaQRotTLVg";

const Light = L.mapbox
  .styleLayer("mapbox://styles/mapbox/light-v10")
  .addTo(map);
const Streets = L.mapbox.styleLayer("mapbox://styles/mapbox/streets-v11");
const Outdoors = L.mapbox.styleLayer("mapbox://styles/mapbox/outdoors-v11");
const Satellite = L.mapbox.styleLayer("mapbox://styles/mapbox/satellite-v9");

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const esriTile = L.esri.basemapLayer("Streets");

// create the geocoding control and add it to the map
// const searchControl = L.esri.Geocoding.geosearch({
//   providers: [
//     L.esri.Geocoding.arcgisOnlineProvider({
//       // API Key to be passed to the ArcGIS Online Geocoding Service
//       apikey:
//         "LPZI_RPSn5QOwul999v_YVinHGRcnhPhKoANjt-c4iQY51JqeKingfBg2gQWcbSQwp0oiO0xXR8z-qKvudiD8bTqcdUjxEj4mLHZKBavH0hs6sCw3DgeVGSyStkKqw89dfS51TihBWLex2mtVulwQ01thCWV_dAzhBZMR14rW8g4TBmiLdva61ychvVcfzUneCcNC5frVB4zCZUxRGbeNHF61KZ1vC73M5gl6eIF9lc.",
//     }),
//   ],
// });

// create an empty layer group to store the results and add it to the map
const results = L.layerGroup().addTo(map);

// listen for the results event and add every result to the map
const travIcon = L.icon({
  iconUrl: "../img/trav.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

//   Ruelles vertes
const ruellesVertesLayer = L.geoJson(ruelles_vertes, {
  onEachFeature: function (feature, layer) {
    layer.setStyle({ color: "green" });
    layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Ruelle verte</strong></p>
            `);
    layer.on("mouseover", function () {
      this.openPopup();
    });
    layer.on("mouseout", function () {
      this.closePopup();
    });
  },
});

//   Axe_mob2021
const axeMobLayer = L.geoJson(axe_mob2021, {
  onEachFeature: function (feature, layer) {
    layer.setStyle({ color: "blue" });
    layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Axe de mobilité 2021</strong></p>
            `);
    layer.on("mouseover", function () {
      this.openPopup();
    });
    layer.on("mouseout", function () {
      this.closePopup();
    });
  },
});

//   Axe_sensible2021
const axeSensibleLayer = L.geoJson(axe_sensible2021, {
  onEachFeature: function (feature, layer) {
    layer.setStyle({ color: "red" });
    layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Axe sensible 2021</strong></p>
            `);
    layer.on("mouseover", function () {
      this.openPopup();
    });
    layer.on("mouseout", function () {
      this.closePopup();
    });
  },
});

//   Patrimoine
const patrimoineLayer = L.geoJson(patrimoine, {
  onEachFeature: function (feature, layer) {
    layer.setStyle({
      fillColor: "magenta",
      color: "magenta",
      opacity: 1,
      fillOpacity: 0.2,
    });
    layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Patrimoine</strong></p>
            `);
    layer.on("mouseover", function () {
      this.setStyle({
        color: "red",
        fillColor: "red",
        opacity: 1,
        fillOpacity: 0.2,
      });
      this.openPopup();
    });
    layer.on("mouseout", function () {
      this.setStyle({
        color: "magenta",
        fillColor: "magenta",
        opacity: 1,
        fillOpacity: 0.2,
      });
      this.closePopup();
    });
  },
});

//   Arrondissements
function getColorArrondissements(feature) {
  switch (feature) {
    case "AHU":
      return "#33658a";
    case "ANJ":
      return "#f6ae2d";
    case "CDN":
      return "#488b49";
    case "IBI":
      return "#639a88";
    case "LAC":
      return "#F71E37";
    case "LAS":
      return "#087E8B";
    case "LSO":
      return "#8b635c";
    case "MHM":
      return "#60594d";
    case "MTN":
      return "#6c4b5e";
    case "OUT":
      return "#040663";
    case "PLA":
      return "#C799A6";
    case "PRF":
      return "#2E294E";
    case "RDP":
      return "#C17767";
    case "RPP":
      return "#17C3B2";
    case "STL":
      return "#296EB4";
    case "VER":
      return "#754668";
    case "VIM":
      return "#587D71";
    case "VSE":
      return "#E15A97";
    case "VSL":
      return "#861388";
  }
}
function styleArrondissements(feature) {
  return {
    color: getColorArrondissements(feature.properties.name),
    fillColor: getColorArrondissements(feature.properties.name),
    opacity: 1,
    fillOpacity: 0.7,
  };
}
const arrondissementsLayer = L.geoJson(arrondissements, {
  style: styleArrondissements,
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Code: </strong>${feature.properties.name}</p>
            <p style='margin:0; padding:0'><strong>Description:</strong> ${feature.properties.description}</p>
            `);

    layer.on("mouseover", function () {
      this.setStyle({
        fillOpacity: 0.3,
        opacity: 1,
      });
    });
    layer.on("mouseout", function () {
      this.setStyle({
        fillOpacity: 0.7,
        opacity: 1,
      });
    });
  },
});

//   Inspecteurs
function getColorInspecteurs(feature) {
  switch (feature) {
    case "A":
      return "#704709";
    case "B":
      return "red";
    case "C":
      return "#940043";
    case "D":
      return "#9004e0";
    case "E":
      return "#0B7A75";
    case "F":
      return "#147ec9";
    case "G":
      return "black";
    case "H":
      return "#8cc720";
  }
}
function styleInspecteurs(feature) {
  return {
    color: getColorInspecteurs(feature.properties.Secteur),
    fillColor: getColorInspecteurs(feature.properties.Secteur),
    opacity: 1,
    fillOpacity: 0.4,
  };
}
const inspecteursLayer = L.geoJson(arrondissements, {
  style: styleInspecteurs,
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Arrond. : </strong>${feature.properties.name}</p>
            <p style='margin:0; padding:0;'><strong>Secteur : </strong>${feature.properties.Secteur}</p>
            <p style='margin:0; padding:0'><strong>Inspecteur :</strong> ${feature.properties.Inspecteur}</p>
            <p style='margin:0; padding:0'><strong>Courriel :</strong> ${feature.properties.Email}</p>
            <p style='margin:0; padding:0'><strong>Téléphone :</strong> ${feature.properties.Téléph}</p>
            `);
    layer.on("mouseover", function () {
      this.setStyle({
        fillOpacity: 0.2,
        opacity: 1,
      });
    });
    layer.on("mouseout", function () {
      this.setStyle({
        fillOpacity: 0.4,
        opacity: 1,
      });
    });
  },
});

//   Horticulteurs
function getColorHorticulteurs(feature) {
  switch (feature) {
    case "A":
      return "#704709";
    case "B":
      return "red";
    case "C":
      return "#940043";
    case "D":
      return "#9004e0";
    case "E":
      return "#0B7A75";
    case "F":
      return "#147ec9";
    case "G":
      return "black";
    case "H":
      return "#8cc720";
  }
}
function styleHorticulteurs(feature) {
  return {
    color: getColorHorticulteurs(feature.properties.Secteur),
    fillColor: getColorHorticulteurs(feature.properties.Secteur),
    opacity: 1,
    fillOpacity: 0.4,
  };
}
const horticulteursLayer = L.geoJson(arrondissements, {
  style: styleHorticulteurs,
  onEachFeature: function (feature, layer) {
    if (feature.properties.Horticulteur2 !== "") {
      layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Arrond. : </strong>${feature.properties.name}</p>
            <p style='margin:0; padding:0'><strong>Horticulteur 1 :</strong> ${feature.properties.Horticulteur1}</p>
            <p style='margin:0; padding:0'><strong>Courriel :</strong> ${feature.properties.Courriel1}</p>
            <p style='margin:0; padding:0'><strong>Téléphone :</strong> ${feature.properties.Téléphone1}</p>
            <br>
            <p style='margin:0; padding:0'><strong>Horticulteur 2 :</strong> ${feature.properties.Horticulteur2}</p>
            <p style='margin:0; padding:0'><strong>Courriel :</strong> ${feature.properties.Courriel2}</p>
            <p style='margin:0; padding:0'><strong>Téléphone :</strong> ${feature.properties.Téléphone2}</p>
            `);
    } else {
      layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Arrond. : </strong>${feature.properties.name}</p>
            <p style='margin:0; padding:0'><strong>Horticulteur :</strong> ${feature.properties.Horticulteur1}</p>
            <p style='margin:0; padding:0'><strong>Courriel :</strong> ${feature.properties.Courriel1}</p>
            <p style='margin:0; padding:0'><strong>Téléphone :</strong> ${feature.properties.Téléphone1}</p>
      `);
    }
    layer.on("mouseover", function () {
      this.setStyle({
        fillOpacity: 0.2,
        opacity: 1,
      });
    });
    layer.on("mouseout", function () {
      this.setStyle({
        fillOpacity: 0.4,
        opacity: 1,
      });
    });
  },
});

//    Secteurs AGIR
function getColorSecteurs(feature) {
  switch (feature) {
    case 1:
      return "orange";
    case 2:
      return "#92d14d";
    case 3:
      return "#4293f5";
    case 4:
      return "yellow";
  }
}
function styleSecteurs(feature) {
  return {
    color: getColorSecteurs(feature.properties.Secteur),
    fillColor: getColorSecteurs(feature.properties.Secteur),
    opacity: 1,
    fillOpacity: 0.7,
  };
}
const secteursAgirLayer = L.geoJson(secteurs_agir, {
  style: styleSecteurs,
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`
            <p style='margin:0; padding:0'><strong>Arrond. : </strong>${feature.properties.NOM_ARRON}</p>
            <p style='margin:0; padding:0'><strong>Secteur : </strong> ${feature.properties.Secteur}</p>
            <p style='margin:0; padding:0'><strong>Ing. : </strong> ${feature.properties.Contact.Ing}</p>
            <p style='margin:0; padding:0'><strong>Ag.T : </strong> ${feature.properties.Contact.AgT}</p>
            `);

    layer.on("mouseover", function () {
      this.setStyle({
        opacity: 1,
        fillOpacity: 0.3,
      });
    });
    layer.on("mouseout", function () {
      this.setStyle({
        opacity: 1,
        fillOpacity: 0.7,
      });
    });
  },
});

//    Casernes
const markers = L.markerClusterGroup();
const geoJsonLayer = L.geoJson(casernes, {
  onEachFeature: function (feature, layer) {
    if (feature.properties.ARRONDISSEMENT !== null) {
      layer.bindPopup(`
            <div>
              <p style='margin:0; padding:0'><strong>Caserne :</strong> ${feature.properties.CASERNE}</p>
              <p style='margin:0; padding:0'><strong>Arrond.:</strong> ${feature.properties.ARRONDISSEMENT}</p>
//               <a href="./data/${feature.properties.id}.jpg" target="_blank">Photo</a>
            </div>
            `);
    } else {
      layer.bindPopup(`
      <div>
        <p><strong>Caserne :</strong> ${feature.properties.CASERNE}</p>
        <p><strong>Ville: </strong> ${feature.properties.VILLE}</p>
      </div>`);
    }
    layer.on("mouseover", function () {
      this.openPopup();
    });
    layer.on("mouseout", function () {
      this.closePopup();
    });
  },
});
const casernesMarkers = markers.addLayer(geoJsonLayer);
map.fitBounds(markers.getBounds());

// listen for the results event and add every result to the map
const pegmanIcon = L.icon({
  iconUrl: "../img/google-street-view.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Add a marker to the centre of the map
const markerGSV = L.marker(map.getCenter(), { icon: pegmanIcon });
// Make sure the marker stays in the centre when the map is moved
map.on("move", function () {
  markerGSV.setLatLng(map.getCenter());
});

//  Control Groups et overlays
const baseMaps = {
  Light: Light,
  Streets: Streets,
  Outdoors: Outdoors,
  Satellite: Satellite,
  ISRI: esriTile,
  OSM: osm,
};
const overlayMaps = {
  Arrondissement: arrondissementsLayer,
  "Axes mobilité sans trav.": axeMobLayer,
  "Axes sensibles avec trav.": axeSensibleLayer,
  Patrimoine: patrimoineLayer,
  "Ruelles vertes": ruellesVertesLayer,
  Casernes: casernesMarkers,
  "Secteurs AGIR": secteursAgirLayer,
  Inspecteurs: inspecteursLayer,
  Horticulteurs: horticulteursLayer,
  "Google Street View": markerGSV,
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

map.addControl(
  new L.Control.Fullscreen({
    title: {
      false: "Afficher plein écran",
      true: "Quitter le plein écran",
    },
  })
);

// Google Street View
L.streetView({ position: "topright" }).addTo(map);

// Draw Tools
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  // position: "topright",
  draw: {
    polygon: {
      shapeOptions: {
        color: "#490066",
      },
      allowIntersection: false,
      drawError: {
        color: "orange",
        timeout: 2000,
      },
      showArea: true,
      metric: true,
      repeatMode: true,
    },
    polyline: {
      shapeOptions: {
        color: "#490066",
      },
      showArea: true,
      metric: true,
      repeatMode: true,
    },
    rectangle: {
      shapeOptions: {
        color: "#490066",
      },
      showArea: true,
      metric: true,
      repeatMode: true,
    },
    circlemarker: false,
    marker: true,
    circle: false,
  },
  edit: {
    featureGroup: drawnItems,
  },
});
map.addControl(drawControl);

map.on("draw:created", function (e) {
  layer = e.layer;
  drawnItems.addLayer(layer);
});

// const geocoder = L.Control.geocoder({
//   geocoder: new L.Control.Geocoder.Nominatim({
//     geocodingQueryParams: {
//       country: "CA",
//       city: "Montreal",
//     },
//   }),
//   defaultMarkGeocode: false,
//   position: "topleft",
//   collapsed: true,
//   placeholder: "Entrez votre adress...",
// })
//   .on("markgeocode", function (e) {
//     let center = e.geocode.center;
//     L.marker(center, { icon: travIcon }).addTo(map);
//     map.flyTo(center, 17);
//   })
//   .addTo(map);
let arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider({ countries: "CA" });
const searchControl = L.esri.Geocoding.geosearch({
  // collapseAfterResult: false,
  placeholder: "Rechercher des lieux ou des adresses...",
  title: "Recherche d'emplacement",
  providers: [arcgisOnline],
}).addTo(map);

searchControl.on("results", function (data) {
  results.clearLayers();
  for (let i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng, { icon: travIcon }));
  }
});

// Échelle à droite en bas
L.control.scale({ position: "bottomright" }).addTo(map);
