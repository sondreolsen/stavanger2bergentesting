const INITIAL_BOUNDS = L.latLngBounds(
  [58.93, 5.28],
  [60.62, 5.72]
);

const HALHJEM_FERRY_QUAY = { label: "Halhjem ferjekai", lat: 60.14735, lon: 5.42693 };
const SANDVIKVAG_FERRY_QUAY = { label: "Sandvikvag ferjekai", lat: 59.96806, lon: 5.33528 };
const HORDFAST_GEOJSON = {
  type: "FeatureCollection",
  name: "hordfast_e39_stord_os_simplified",
  features: [
    { type: "Feature", properties: { OBJECTID: 1, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.49657, 59.79889], [5.52196, 59.83079], [5.51653, 59.86726]] } },
    { type: "Feature", properties: { OBJECTID: 2, Navn: "Alt_F2_Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.51684, 59.86642], [5.50948, 59.8775], [5.51581, 59.88585]] } },
    { type: "Feature", properties: { OBJECTID: 3, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.51581, 59.88585], [5.54041, 59.89567]] } },
    { type: "Feature", properties: { OBJECTID: 4, Navn: "Alt_F2_Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.54041, 59.89567], [5.54831, 59.90674], [5.53495, 59.91976]] } },
    { type: "Feature", properties: { OBJECTID: 5, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.53495, 59.91976], [5.51754, 59.96451]] } },
    { type: "Feature", properties: { OBJECTID: 6, Navn: "Alt_F2_Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.51754, 59.96451], [5.5062, 59.97899]] } },
    { type: "Feature", properties: { OBJECTID: 7, Navn: "Alt_F2_Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.41882, 59.98082], [5.40996, 59.98096]] } },
    { type: "Feature", properties: { OBJECTID: 8, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.5062, 59.97899], [5.46022, 59.98668], [5.41882, 59.98082]] } },
    { type: "Feature", properties: { OBJECTID: 9, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.40996, 59.98096], [5.3707, 59.99562], [5.36748, 60.01298]] } },
    { type: "Feature", properties: { OBJECTID: 10, Navn: "Alt_F2_Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.36748, 60.01298], [5.36876, 60.02293]] } },
    { type: "Feature", properties: { OBJECTID: 11, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.36876, 60.02293], [5.37302, 60.03837]] } },
    { type: "Feature", properties: { OBJECTID: 12, Navn: "Alt_F2_Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.37302, 60.03837], [5.37478, 60.05711]] } },
    { type: "Feature", properties: { OBJECTID: 13, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.37478, 60.05711], [5.37078, 60.06762]] } },
    { type: "Feature", properties: { OBJECTID: 14, Navn: "K7-1", Medium: "Bru" }, geometry: { type: "LineString", coordinates: [[5.37078, 60.06762], [5.36388, 60.07912], [5.3887, 60.10875], [5.37875, 60.13227]] } },
    { type: "Feature", properties: { OBJECTID: 15, Navn: "K7-1-Tunnel", Medium: "Tunnel" }, geometry: { type: "LineString", coordinates: [[5.37875, 60.13227], [5.37653, 60.14304], [5.4284, 60.1722], [5.44118, 60.18841]] } },
    { type: "Feature", properties: { OBJECTID: 16, Navn: "Alt_F2_Veg_i_dagen", Medium: "Veg i dagen" }, geometry: { type: "LineString", coordinates: [[5.44118, 60.18841], [5.44045, 60.20445]] } },
  ],
};

const CURRENT_E39_FERRY_SEGMENT = {
  label: "Halhjem-Sandvikvag",
  distance: 22000,
  duration: 40 * 60,
  geometry: {
    type: "LineString",
    coordinates: [
      [HALHJEM_FERRY_QUAY.lon, HALHJEM_FERRY_QUAY.lat],
      [5.398, 60.075],
      [5.368, 60.025],
      [SANDVIKVAG_FERRY_QUAY.lon, SANDVIKVAG_FERRY_QUAY.lat],
    ],
  },
};

const FUTURE_SOUTH_ANCHOR = { label: "Smiene", lat: 58.9826, lon: 5.6978 };
const FUTURE_NORTH_ANCHOR = { label: "Vagsbotn", lat: 60.4658, lon: 5.3986 };
const FUTURE_KLAUVANESET = { label: "Klauvaneset", lat: 60.4775, lon: 5.3456 };
const FUTURE_HORDFAST_NORTH = { label: "Svegatjorn", lat: 60.20445, lon: 5.44045 };
const FUTURE_HORDFAST_SOUTH = { label: "Adland", lat: 59.79889, lon: 5.49657 };
const FUTURE_BOMLAFJORDEN_NORTH = { label: "Bomlafjorden nord", lat: 59.7364, lon: 5.455 };
const FUTURE_BOKN = { label: "Vestre Bokn", lat: 59.2297, lon: 5.4613 };
const FUTURE_HARESTAD = { label: "Harestad", lat: 59.0688, lon: 5.6417 };

const FUTURE_E39_SEGMENTS = [
  {
    label: "E39 Klauvaneset-Vagsbotn",
    distance: 7500,
    duration: 5 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.3986, 60.4658],
        [5.389, 60.468],
        [5.378, 60.472],
        [5.366, 60.475],
        [5.356, 60.476],
        [5.3456, 60.4775],
      ],
    },
  },
  {
    label: "E39 Hordfast / Stord-Os / Adland-Svegatjorn",
    distance: 55000,
    duration: 31 * 60,
    geometry: null,
  },
  {
    label: "E39 Bokn-Bomlafjorden",
    distance: 62000,
    duration: 34 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.455, 59.7364],
        [5.418, 59.698],
        [5.368, 59.655],
        [5.329, 59.603],
        [5.302, 59.548],
        [5.289, 59.49],
        [5.295, 59.43],
        [5.319, 59.373],
        [5.363, 59.321],
        [5.42, 59.272],
        [5.4613, 59.2297],
      ],
    },
  },
  {
    label: "E39 Rogfast",
    distance: 27000,
    duration: 18 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.4613, 59.2297],
        [5.455, 59.187],
        [5.469, 59.143],
        [5.5, 59.101],
        [5.551, 59.075],
        [5.603, 59.067],
        [5.6417, 59.0688],
      ],
    },
  },
  {
    label: "E39 Smiene-Harestad",
    distance: 5000,
    duration: 4 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.6417, 59.0688],
        [5.653, 59.056],
        [5.667, 59.043],
        [5.682, 59.027],
        [5.6978, 58.9826],
      ],
    },
  },
];

const state = {
  activeRequestId: 0,
  current: createMapState(),
  future: createMapState(),
};

const statusEl = document.querySelector("#status");
const formEl = document.querySelector("#route-form");
const fromInputEl = document.querySelector("#from-input");
const toInputEl = document.querySelector("#to-input");
const fromSuggestionsEl = document.querySelector("#from-suggestions");
const toSuggestionsEl = document.querySelector("#to-suggestions");
const submitButtonEl = document.querySelector("#submit-button");
const leftSummaryEl = document.querySelector("#summary-left");
const rightSummaryEl = document.querySelector("#summary-right");
const futureSavingsEl = document.querySelector("#future-savings");
const leftDetailsEl = document.querySelector("#details-left");
const rightDetailsEl = document.querySelector("#details-right");

const autocompleteState = {
  from: createAutocompleteState(),
  to: createAutocompleteState(),
};

const mapLeft = L.map("map-left", {
  zoomControl: true,
  scrollWheelZoom: true,
});

const mapRight = L.map("map-right", {
  zoomControl: true,
  scrollWheelZoom: true,
});

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap-bidragsytere &copy; CARTO",
  subdomains: "abcd",
  maxZoom: 20,
}).addTo(mapLeft);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap-bidragsytere",
  maxZoom: 19,
}).addTo(mapRight);

mapLeft.fitBounds(INITIAL_BOUNDS, { padding: [8, 8] });
mapRight.fitBounds(INITIAL_BOUNDS, { padding: [8, 8] });

syncMaps(mapLeft, mapRight);
setupAutocomplete("from", fromInputEl, fromSuggestionsEl);
setupAutocomplete("to", toInputEl, toSuggestionsEl);

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fromText = fromInputEl.value.trim();
  const toText = toInputEl.value.trim();

  if (!fromText || !toText) {
    setStatus("Skriv inn bade startsted og malsted.");
    return;
  }

  submitButtonEl.disabled = true;
  setStatus("Soker opp steder og beregner dagens og framtidig E39 ...");

  const requestId = Date.now();
  state.activeRequestId = requestId;

  try {
    const [fromLocation, toLocation] = await Promise.all([
      geocodePlace(fromText),
      geocodePlace(toText),
    ]);

    if (state.activeRequestId !== requestId) {
      return;
    }

    const [currentRoute, futureRoute] = await Promise.all([
      fetchCurrentE39Route(fromLocation, toLocation),
      fetchFutureE39Route(fromLocation, toLocation),
    ]);

    if (state.activeRequestId !== requestId) {
      return;
    }

    drawRoutes(currentRoute, futureRoute, fromLocation, toLocation);
    setStatus("Rutene er oppdatert. Hoyre kart viser framtidstrase bygget fra offentlige plankart og prosjektkorridorer.");
  } catch (error) {
    console.error(error);
    clearMapVisuals(state.current);
    clearMapVisuals(state.future);
    setStatus(error.message || "Klarte ikke a hente rute. Prov et mer presist stednavn eller adresse.");
    leftSummaryEl.textContent = "Ingen rute funnet";
    rightSummaryEl.textContent = "Ingen rute funnet";
    futureSavingsEl.textContent = "";
    leftDetailsEl.hidden = true;
    rightDetailsEl.hidden = true;
  } finally {
    if (state.activeRequestId === requestId) {
      submitButtonEl.disabled = false;
    }
  }
});

void runInitialRoute();

async function runInitialRoute() {
  await formEl.requestSubmit();
}

function createMapState() {
  return {
    routeLayers: [],
    markers: [],
    popups: [],
  };
}

function createAutocompleteState() {
  return {
    items: [],
    highlightedIndex: -1,
    debounceId: null,
    requestId: 0,
  };
}

async function geocodePlace(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "no");
  url.searchParams.set("q", query);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Klarte ikke a sla opp stedet akkurat na.");
  }

  const results = await response.json();
  const match = results[0];

  if (!match) {
    throw new Error(`Fant ikke noe treff for "${query}".`);
  }

  return {
    label: match.display_name,
    lat: Number(match.lat),
    lon: Number(match.lon),
  };
}

async function fetchPlaceSuggestions(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("countrycodes", "no");
  url.searchParams.set("q", query);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Klarte ikke a hente adresseforslag akkurat na.");
  }

  const results = await response.json();
  return results.map((result) => ({
    label: result.display_name,
    shortLabel: shortenLabel(result.display_name),
    lat: Number(result.lat),
    lon: Number(result.lon),
  }));
}

async function fetchRoadRoute(points) {
  const coordinates = points
    .map((point) => `${point.lon},${point.lat}`)
    .join(";");
  const url = new URL(`https://router.project-osrm.org/route/v1/driving/${coordinates}`);
  url.searchParams.set("overview", "full");
  url.searchParams.set("geometries", "geojson");
  url.searchParams.set("alternatives", "false");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Ruteberegningen feilet.");
  }

  const payload = await response.json();
  const route = payload.routes?.[0];

  if (!route) {
    throw new Error("Fant ingen kjorbar rute mellom stedene.");
  }

  return route;
}

async function fetchCurrentE39Route(fromLocation, toLocation) {
  const [northLeg, southLeg] = await Promise.all([
    fetchRoadRoute([fromLocation, HALHJEM_FERRY_QUAY]),
    fetchRoadRoute([SANDVIKVAG_FERRY_QUAY, toLocation]),
  ]);

  return mergeRouteSegments([
    northLeg,
    CURRENT_E39_FERRY_SEGMENT,
    southLeg,
  ]);
}

async function fetchFutureE39Route(fromLocation, toLocation) {
  const shouldRunNorthToSouth = chooseFutureDirection(fromLocation, toLocation);
  const { futureSegments, hordfastGeoJson } = await getFutureSegments();
  const orderedFixedSegments = shouldRunNorthToSouth
    ? futureSegments
    : [...futureSegments].reverse().map(reverseSegment);

  const startAnchor = shouldRunNorthToSouth ? FUTURE_NORTH_ANCHOR : FUTURE_SOUTH_ANCHOR;
  const endAnchor = shouldRunNorthToSouth ? FUTURE_SOUTH_ANCHOR : FUTURE_NORTH_ANCHOR;

  const corridorRoute = await buildFutureCorridor(shouldRunNorthToSouth, orderedFixedSegments);
  const [firstLeg, lastLeg] = await Promise.all([
    fetchRoadRoute([fromLocation, startAnchor]),
    fetchRoadRoute([endAnchor, toLocation]),
  ]);

  const route = mergeRouteSegments([firstLeg, ...corridorRoute, lastLeg]);

  return {
    ...route,
    projects: orderedFixedSegments.map((segment) => segment.label),
    hordfastGeoJson: shouldRunNorthToSouth ? hordfastGeoJson : reverseHordfastGeoJson(hordfastGeoJson),
  };
}

async function getFutureSegments() {
  const hordfastSegment = await loadHordfastSegment();

  return {
    futureSegments: FUTURE_E39_SEGMENTS.map((segment) =>
      segment.label.includes("Hordfast")
        ? { ...segment, geometry: hordfastSegment.geometry, distance: hordfastSegment.distance }
        : segment
    ),
    hordfastGeoJson: hordfastSegment.geojson,
  };
}

async function loadHordfastSegment() {
  const geojson = HORDFAST_GEOJSON;
  const coordinates = flattenGeoJsonToLine(geojson);
  if (coordinates.length < 2) {
    throw new Error("Hordfast-filen inneholder ikke en gyldig linje.");
  }

  return {
    geometry: {
      type: "LineString",
      coordinates,
    },
    distance: estimateLineDistance(coordinates),
    geojson,
  };
}

function reverseHordfastGeoJson(geojson) {
  return {
    ...geojson,
    features: (geojson.features ?? []).map((feature) => ({
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: [...(feature.geometry?.coordinates ?? [])].reverse(),
      },
    })).reverse(),
  };
}

function flattenGeoJsonToLine(geojson) {
  const features = geojson.features ?? [];
  const sortedFeatures = [...features].sort(
    (left, right) => (left.properties?.OBJECTID ?? 0) - (right.properties?.OBJECTID ?? 0)
  );

  const mergedCoordinates = [];
  sortedFeatures.forEach((feature) => {
    const lineCoordinates = feature.geometry?.coordinates ?? [];
    lineCoordinates.forEach((coordinate, index) => {
      const previous = mergedCoordinates[mergedCoordinates.length - 1];
      const isDuplicate =
        previous &&
        previous[0] === coordinate[0] &&
        previous[1] === coordinate[1];

      if (index === 0 && isDuplicate) {
        return;
      }

      mergedCoordinates.push(coordinate);
    });
  });

  return mergedCoordinates;
}

async function buildFutureCorridor(shouldRunNorthToSouth, fixedSegments) {
  const connectorPointSets = shouldRunNorthToSouth
    ? [
        [FUTURE_KLAUVANESET, FUTURE_HORDFAST_NORTH],
        [FUTURE_HORDFAST_SOUTH, FUTURE_BOMLAFJORDEN_NORTH],
      ]
    : [
        [FUTURE_BOMLAFJORDEN_NORTH, FUTURE_HORDFAST_SOUTH],
        [FUTURE_HORDFAST_NORTH, FUTURE_KLAUVANESET],
      ];

  const connectorRoutes = await Promise.all(
    connectorPointSets.map(([fromPoint, toPoint]) => fetchRoadRoute([fromPoint, toPoint]))
  );

  return shouldRunNorthToSouth
    ? [
        fixedSegments[0],
        connectorRoutes[0],
        fixedSegments[1],
        connectorRoutes[1],
        fixedSegments[2],
        fixedSegments[3],
        fixedSegments[4],
      ]
    : [
        fixedSegments[0],
        fixedSegments[1],
        fixedSegments[2],
        connectorRoutes[0],
        fixedSegments[3],
        connectorRoutes[1],
        fixedSegments[4],
      ];
}

function chooseFutureDirection(fromLocation, toLocation) {
  const fromToSouth = straightLineDistance(fromLocation, FUTURE_SOUTH_ANCHOR);
  const fromToNorth = straightLineDistance(fromLocation, FUTURE_NORTH_ANCHOR);
  const toToSouth = straightLineDistance(toLocation, FUTURE_SOUTH_ANCHOR);
  const toToNorth = straightLineDistance(toLocation, FUTURE_NORTH_ANCHOR);

  if (fromToNorth + toToSouth < fromToSouth + toToNorth) {
    return true;
  }

  if (fromToSouth + toToNorth < fromToNorth + toToSouth) {
    return false;
  }

  return fromLocation.lat > toLocation.lat;
}

function reverseSegment(segment) {
  return {
    ...segment,
    geometry: {
      ...segment.geometry,
      coordinates: [...segment.geometry.coordinates].reverse(),
    },
  };
}

function mergeRouteSegments(segments) {
  const mergedCoordinates = [];
  let totalDistance = 0;
  let totalDuration = 0;

  segments.forEach((segment, index) => {
    totalDistance += segment.distance;
    totalDuration += segment.duration;

    const segmentCoordinates = segment.geometry.coordinates;
    if (index === 0) {
      mergedCoordinates.push(...segmentCoordinates);
    } else {
      mergedCoordinates.push(...segmentCoordinates.slice(1));
    }
  });

  return {
    distance: totalDistance,
    duration: totalDuration,
    geometry: {
      type: "LineString",
      coordinates: mergedCoordinates,
    },
  };
}

function estimateLineDistance(coordinates) {
  let distance = 0;

  for (let index = 1; index < coordinates.length; index += 1) {
    const [prevLon, prevLat] = coordinates[index - 1];
    const [nextLon, nextLat] = coordinates[index];
    distance += estimateDistanceBetweenPoints(
      { lat: prevLat, lon: prevLon },
      { lat: nextLat, lon: nextLon }
    );
  }

  return distance;
}

function styleHordfastFeature(feature) {
  const medium = feature?.properties?.Medium ?? "";
  const name = feature?.properties?.Navn ?? "";

  if (/Tunnel/i.test(medium)) {
    return {
      color: "#5f6b7a",
      weight: 7,
      opacity: 0.96,
      dashArray: "10 8",
    };
  }

  if (/bru/i.test(medium) || /K7-1/i.test(name)) {
    return {
      color: "#f4b400",
      weight: 8,
      opacity: 0.96,
    };
  }

  return {
    color: "#dd6b20",
    weight: 7,
    opacity: 0.96,
  };
}

function drawRoutes(currentRoute, futureRoute, fromLocation, toLocation) {
  clearMapVisuals(state.current);
  clearMapVisuals(state.future);

  const currentLayer = L.geoJSON(currentRoute.geometry, {
    style: {
      color: "#0e7a63",
      weight: 6,
      opacity: 0.92,
    },
  }).addTo(mapLeft);

  const futureLayer = L.geoJSON(futureRoute.geometry, {
    style: {
      color: "#dd6b20",
      weight: 6,
      opacity: 0.9,
    },
  }).addTo(mapRight);

  state.current.routeLayers.push(currentLayer);
  state.future.routeLayers.push(futureLayer);

  if (futureRoute.hordfastGeoJson) {
    const hordfastLayer = L.geoJSON(futureRoute.hordfastGeoJson, {
      style: styleHordfastFeature,
    }).addTo(mapRight);
    state.future.routeLayers.push(hordfastLayer);
  }

  const startLatLng = L.latLng(fromLocation.lat, fromLocation.lon);
  const endLatLng = L.latLng(toLocation.lat, toLocation.lon);

  state.current.markers.push(
    addMarker(mapLeft, startLatLng, "Start", fromLocation.label),
    addMarker(mapLeft, endLatLng, "Mal", toLocation.label)
  );

  state.future.markers.push(
    addMarker(mapRight, startLatLng, "Start", fromLocation.label),
    addMarker(mapRight, endLatLng, "Mal", toLocation.label)
  );

  leftSummaryEl.textContent = formatDuration(currentRoute.duration);
  rightSummaryEl.textContent = formatDuration(futureRoute.duration);
  futureSavingsEl.textContent = `Sparer ${formatDurationDelta(currentRoute.duration - futureRoute.duration)}`;

  leftDetailsEl.innerHTML = buildDetailsHtml({
    title: formatSummary(currentRoute.distance, currentRoute.duration),
    fromLocation,
    toLocation,
    footer: "Dagens E39 via Halhjem-Sandvikvag",
  });
  leftDetailsEl.hidden = false;

  rightDetailsEl.innerHTML = buildDetailsHtml({
    title: formatSummary(futureRoute.distance, futureRoute.duration),
    fromLocation,
    toLocation,
    footer: `Sparer ${formatDurationDelta(currentRoute.duration - futureRoute.duration)} med Klauvaneset-Vagsbotn, Hordfast, Bokn-Bomlafjorden, Rogfast og Smiene-Harestad`,
  });
  rightDetailsEl.hidden = false;

  mapLeft.fitBounds(currentLayer.getBounds().pad(0.06), { padding: [10, 10] });
}

function buildDetailsHtml({ title, fromLocation, toLocation, footer }) {
  return `
    <div class="route-popup">
      <strong>${title}</strong>
      <div><b>Fra:</b> ${escapeHtml(shortenLabel(fromLocation.label))}</div>
      <div><b>Til:</b> ${escapeHtml(shortenLabel(toLocation.label))}</div>
      <div class="route-popup__footer">${escapeHtml(footer)}</div>
    </div>
  `;
}

function addMarker(map, latLng, title, description) {
  return L.marker(latLng)
    .addTo(map)
    .bindPopup(`<strong>${title}</strong><br>${escapeHtml(description)}`);
}

function clearMapVisuals(mapState) {
  mapState.routeLayers.forEach((layer) => layer.remove());
  mapState.markers.forEach((marker) => marker.remove());
  mapState.popups.forEach((popup) => popup.remove());

  mapState.routeLayers = [];
  mapState.markers = [];
  mapState.popups = [];
}

function formatSummary(distanceInMeters, durationInSeconds) {
  const kilometers = (distanceInMeters / 1000).toFixed(1).replace(".", ",");
  const durationLabel = formatDuration(durationInSeconds);
  return `${durationLabel} • ${kilometers} km`;
}

function formatDuration(durationInSeconds) {
  const totalMinutes = Math.round(durationInSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} t ${minutes.toString().padStart(2, "0")} min`;
  }

  return `${minutes} min`;
}

function formatDurationDelta(deltaInSeconds) {
  if (deltaInSeconds <= 0) {
    return "0 min";
  }

  return formatDuration(deltaInSeconds);
}

function shortenLabel(label) {
  const trimmed = label.split(",").slice(0, 3).join(",").trim();
  return trimmed || label;
}

function setStatus(message) {
  statusEl.textContent = message;
}

function setupAutocomplete(fieldKey, inputEl, suggestionsEl) {
  inputEl.addEventListener("input", () => {
    const query = inputEl.value.trim();
    const fieldState = autocompleteState[fieldKey];

    clearTimeout(fieldState.debounceId);

    if (query.length < 2) {
      hideSuggestions(fieldKey, suggestionsEl);
      return;
    }

    fieldState.debounceId = window.setTimeout(async () => {
      const requestId = Date.now();
      fieldState.requestId = requestId;

      try {
        const items = await fetchPlaceSuggestions(query);
        if (fieldState.requestId !== requestId) {
          return;
        }

        fieldState.items = items;
        fieldState.highlightedIndex = -1;
        renderSuggestions(fieldKey, inputEl, suggestionsEl);
      } catch (error) {
        if (fieldState.requestId !== requestId) {
          return;
        }

        fieldState.items = [];
        fieldState.highlightedIndex = -1;
        hideSuggestions(fieldKey, suggestionsEl);
      }
    }, 220);
  });

  inputEl.addEventListener("keydown", (event) => {
    const fieldState = autocompleteState[fieldKey];
    if (!fieldState.items.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      fieldState.highlightedIndex = Math.min(fieldState.highlightedIndex + 1, fieldState.items.length - 1);
      renderSuggestions(fieldKey, inputEl, suggestionsEl);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      fieldState.highlightedIndex = Math.max(fieldState.highlightedIndex - 1, 0);
      renderSuggestions(fieldKey, inputEl, suggestionsEl);
      return;
    }

    if (event.key === "Enter" && fieldState.highlightedIndex >= 0) {
      event.preventDefault();
      applySuggestion(fieldKey, inputEl, suggestionsEl, fieldState.items[fieldState.highlightedIndex]);
      return;
    }

    if (event.key === "Escape") {
      hideSuggestions(fieldKey, suggestionsEl);
    }
  });

  inputEl.addEventListener("blur", () => {
    window.setTimeout(() => hideSuggestions(fieldKey, suggestionsEl), 140);
  });

  inputEl.addEventListener("focus", () => {
    const fieldState = autocompleteState[fieldKey];
    if (fieldState.items.length) {
      renderSuggestions(fieldKey, inputEl, suggestionsEl);
    }
  });
}

function renderSuggestions(fieldKey, inputEl, suggestionsEl) {
  const fieldState = autocompleteState[fieldKey];
  if (!fieldState.items.length) {
    hideSuggestions(fieldKey, suggestionsEl);
    return;
  }

  suggestionsEl.innerHTML = "";
  suggestionsEl.hidden = false;

  fieldState.items.forEach((item, index) => {
    const buttonEl = document.createElement("button");
    buttonEl.type = "button";
    buttonEl.className = "suggestion-item";
    if (index === fieldState.highlightedIndex) {
      buttonEl.classList.add("is-active");
    }

    buttonEl.innerHTML = `
      <strong>${escapeHtml(item.shortLabel)}</strong>
      <span>${escapeHtml(item.label)}</span>
    `;

    buttonEl.addEventListener("mousedown", (event) => {
      event.preventDefault();
      applySuggestion(fieldKey, inputEl, suggestionsEl, item);
    });

    suggestionsEl.appendChild(buttonEl);
  });
}

function applySuggestion(fieldKey, inputEl, suggestionsEl, item) {
  inputEl.value = item.label;
  autocompleteState[fieldKey].items = [];
  autocompleteState[fieldKey].highlightedIndex = -1;
  hideSuggestions(fieldKey, suggestionsEl);
}

function hideSuggestions(fieldKey, suggestionsEl) {
  autocompleteState[fieldKey].highlightedIndex = -1;
  suggestionsEl.hidden = true;
  suggestionsEl.innerHTML = "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function straightLineDistance(pointA, pointB) {
  const latDiff = pointA.lat - pointB.lat;
  const lonDiff = pointA.lon - pointB.lon;
  return Math.sqrt(latDiff ** 2 + lonDiff ** 2);
}

function estimateDistanceBetweenPoints(pointA, pointB) {
  const earthRadius = 6371000;
  const lat1 = toRadians(pointA.lat);
  const lat2 = toRadians(pointB.lat);
  const deltaLat = toRadians(pointB.lat - pointA.lat);
  const deltaLon = toRadians(pointB.lon - pointA.lon);

  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  const arc = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return earthRadius * arc;
}

function toRadians(value) {
  return value * (Math.PI / 180);
}

function syncMaps(primaryMap, secondaryMap) {
  let isSyncing = false;

  const sync = (sourceMap, targetMap) => {
    if (isSyncing) {
      return;
    }

    isSyncing = true;
    targetMap.setView(sourceMap.getCenter(), sourceMap.getZoom(), {
      animate: false,
    });
    isSyncing = false;
  };

  primaryMap.on("move", () => sync(primaryMap, secondaryMap));
  secondaryMap.on("move", () => sync(secondaryMap, primaryMap));
}
