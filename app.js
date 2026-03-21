const INITIAL_BOUNDS = L.latLngBounds(
  [58.85, 5.4],
  [60.7, 5.75]
);

const HALHJEM_FERRY_QUAY = { label: "Halhjem ferjekai", lat: 60.14735, lon: 5.42693 };
const SANDVIKVAG_FERRY_QUAY = { label: "Sandvikvag ferjekai", lat: 59.96806, lon: 5.33528 };

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

const FUTURE_SOUTH_ANCHOR = { label: "Smiene-Harestad", lat: 59.009, lon: 5.690 };
const FUTURE_NORTH_ANCHOR = { label: "Asland-Svegatjorn", lat: 60.208, lon: 5.465 };

const FUTURE_E39_SEGMENTS = [
  {
    label: "E39 Smiene-Harestad",
    distance: 8000,
    duration: 5 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.690, 59.009],
        [5.660, 59.030],
        [5.620, 59.050],
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
        [5.620, 59.050],
        [5.575, 59.125],
        [5.520, 59.205],
        [5.470, 59.270],
      ],
    },
  },
  {
    label: "E39 Bokn-Bomlafjorden",
    distance: 62000,
    duration: 34 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.470, 59.270],
        [5.430, 59.360],
        [5.365, 59.500],
        [5.315, 59.635],
        [5.340, 59.760],
        [5.455, 59.885],
      ],
    },
  },
  {
    label: "E39 Hordfast / Stord-Os / Asland-Svegatjorn",
    distance: 55000,
    duration: 31 * 60,
    geometry: {
      type: "LineString",
      coordinates: [
        [5.455, 59.885],
        [5.390, 59.995],
        [5.405, 60.085],
        [5.465, 60.208],
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
const submitButtonEl = document.querySelector("#submit-button");
const leftSummaryEl = document.querySelector("#summary-left");
const rightSummaryEl = document.querySelector("#summary-right");

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

mapLeft.fitBounds(INITIAL_BOUNDS, { padding: [24, 24] });
mapRight.fitBounds(INITIAL_BOUNDS, { padding: [24, 24] });

syncMaps(mapLeft, mapRight);

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
    setStatus("Rutene er oppdatert. Hoyre kart viser modellert framtidig E39 med tidsbesparelse.");
  } catch (error) {
    console.error(error);
    clearMapVisuals(state.current);
    clearMapVisuals(state.future);
    setStatus(error.message || "Klarte ikke a hente rute. Prov et mer presist stednavn eller adresse.");
    leftSummaryEl.textContent = "Ingen rute funnet";
    rightSummaryEl.textContent = "Ingen rute funnet";
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
  const corridorSegments = shouldRunNorthToSouth
    ? [...FUTURE_E39_SEGMENTS].reverse().map(reverseSegment)
    : FUTURE_E39_SEGMENTS;

  const startAnchor = shouldRunNorthToSouth ? FUTURE_NORTH_ANCHOR : FUTURE_SOUTH_ANCHOR;
  const endAnchor = shouldRunNorthToSouth ? FUTURE_SOUTH_ANCHOR : FUTURE_NORTH_ANCHOR;

  const [firstLeg, lastLeg] = await Promise.all([
    fetchRoadRoute([fromLocation, startAnchor]),
    fetchRoadRoute([endAnchor, toLocation]),
  ]);

  const route = mergeRouteSegments([
    firstLeg,
    ...corridorSegments,
    lastLeg,
  ]);

  return {
    ...route,
    projects: FUTURE_E39_SEGMENTS.map((segment) => segment.label),
  };
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

  leftSummaryEl.textContent = formatSummary(currentRoute.distance, currentRoute.duration);
  rightSummaryEl.textContent = `${formatSummary(futureRoute.distance, futureRoute.duration)}\nSparer ${formatDurationDelta(currentRoute.duration - futureRoute.duration)}`;

  const currentPopup = buildPopupHtml({
    title: formatSummary(currentRoute.distance, currentRoute.duration),
    fromLocation,
    toLocation,
    footer: "Dagens E39 via Halhjem-Sandvikvag",
  });

  const futurePopup = buildPopupHtml({
    title: formatSummary(futureRoute.distance, futureRoute.duration),
    fromLocation,
    toLocation,
    footer: `Sparer ${formatDurationDelta(currentRoute.duration - futureRoute.duration)} med Smiene-Harestad, Rogfast, Bokn-Bomlafjorden og Hordfast`,
  });

  const currentCenter = currentLayer.getBounds().getCenter();
  const futureCenter = futureLayer.getBounds().getCenter();

  state.current.popups.push(
    L.popup({ autoClose: false, closeButton: false, offset: [0, -6] })
      .setLatLng(currentCenter)
      .setContent(currentPopup)
      .openOn(mapLeft)
  );

  state.future.popups.push(
    L.popup({ autoClose: false, closeButton: false, offset: [0, -6] })
      .setLatLng(futureCenter)
      .setContent(futurePopup)
      .openOn(mapRight)
  );

  mapLeft.fitBounds(currentLayer.getBounds().pad(0.16), { padding: [24, 24] });
}

function buildPopupHtml({ title, fromLocation, toLocation, footer }) {
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
