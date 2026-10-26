
import { useEffect, useState } from "react";
import {
   MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet-geosearch/dist/geosearch.css";

import type { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { SideBar } from "./sidebar";
import "./addStation.css"

function SearchField() {
  const map = useMap(); // Access the Leaflet map instance


useEffect(() => {
  const provider = new OpenStreetMapProvider({
      params: {
        countrycodes: "lk",
        addressdetails: 1,
      },
  }
  );

  const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      autoClose: true,
      searchLabel: "Search Sri Lankan town or address...",
      keepResult: true,
  });

  map.addControl(searchControl);

  // Clean up control on component unmount
  return () => {
    map.removeControl(searchControl);
  };
}, [map]);


  return null;
}


// function addMark() {
//   const position = [51.505, -0.09];

//   const handleMarkerClick = (e) => {
//     console.log("Marker clicked!", e);
//     // 'e.target' points to the underlying Leaflet marker object
//     const { lat, lng } = e.target.getLatLng(); 
//     console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//   };
//    return (
//     <Marker 
//       position={position}
//       eventHandlers={{
//         click: handleMarkerClick,
//       }}
//     >
//       <Popup>You clicked the marker!</Popup>
//     </Marker>
//   );
// }

function AddFillingStationLocation() {
  const [position, setPosition] = useState<LatLng | null>(
    null
  );

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <strong>Selected Station Location</strong>
        <br />
        Latitude: {position.lat.toFixed(6)}
        <br />
        Longitude: {position.lng.toFixed(6)}
        <br />
        <button
          onClick={() => {
            alert(
              `Latitude: ${position.lat}\nLongitude: ${position.lng}`
            );
          }}
        >
          Confirm Location
        </button>
      </Popup>
    </Marker>
  );
}

export default function AddStationMap() {
  return (
    <div className="pump-dashboard">
            <SideBar/>
            <main className="pump-main">
      <header className="pump-nameBar">
              <div className="pump-welcome-Tag">
                <h1>Add your filling station</h1>
                <p className="page-description">
                  Put your station on the map so drivers nearby can see your fuel stock.
                </p>
              </div>
      </header>
       <section className="station-details-card">
        <div className="station-card-heading">
          <span className="station-step-number">1</span>
          <h2>Station details</h2>
        </div>

        <form className="station-details-form">
          <div className="station-form-group">
            <label htmlFor="stationName">Station name</label>
            <input
              type="text"
              id="stationName"
              name="stationName"
              placeholder="Enter your station name"
            />
          </div>

          <div className="station-form-row">
            <div className="station-form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="011 234 5678"
              />
            </div>

            <div className="station-form-group">
              <label htmlFor="email">Email (optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="station@example.com"
              />
            </div>
          </div>

          <div className="station-form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your station address"
            />
          </div>
        </form>
      </section>

       <section className="station-details-card">

        <div className="station-card-heading">
          <span className="station-step-number">2</span>
          <h2>Pin Your location</h2>
        </div>

        <div className="station-map-design">
          {/* <div className="station-map-search">
            <span className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>

            <input
              type="text"
              placeholder="Search city, town or station address..."
              className="station-location-search"
            />

            <button type="button" className="station-search-btn">
              Search
            </button>
            </div> */}

  <div className="station-map-container">
    
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
         <SearchField/>
         
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddFillingStationLocation/>
   
    </MapContainer>
  </div>

  <div className="station-map-hint">
    <span className="station-location-icon">📍</span>
    <div>
      <strong>Choose your station position</strong>
      <p>Click anywhere on the map to select the exact location.</p>
    </div>
  </div>
</div>

       </section>
       <section className="station-details-card">
        <div className="station-card-heading">
          <span className="station-step-number">3</span>
          <h2>Fuels you sell</h2>
          
        </div>
           <p className="fuel-description">
              Tick the fuels you sell and enter your starting stock.
              You can change it any time.
            </p>
             <div className="fuel-column-headings">
                <span></span>
                <span>Tank capacity (L)</span>
                <span>Current stock (L)</span>
              </div>
                    <div className="fuel-list">
            <div className="fuel-row">
              <label className="fuel-name">
                <input type="checkbox" defaultChecked />
                <span>Petrol 92</span>
              </label>
              <input type="number" defaultValue={10000} />
              <input type="number" defaultValue={7800} />
            </div>

            <div className="fuel-row">
              <label className="fuel-name">
                <input type="checkbox" defaultChecked />
                <span>Petrol 95</span>
              </label>
              <input type="number" defaultValue={10000} />
              <input type="number" defaultValue={3400} />
            </div>

            <div className="fuel-row">
              <label className="fuel-name" >
                <input type="checkbox" defaultChecked  />
                <span>Auto Diesel</span>
              </label>
              <input type="number" defaultValue={10000} />
              <input type="number" defaultValue={9100} />
            </div>

            <div className="fuel-row">
              <label className="fuel-name">
                <input type="checkbox" defaultChecked />
                <span>Super Diesel</span>
              </label>
              <input type="number" defaultValue={10000} />
              <input type="number" defaultValue={0} />
            </div>

            <div className="fuel-row">
              <label className="fuel-name">
                <input type="checkbox"  />
                <span>Kerosene</span>
              </label>
              <input type="number" defaultValue={0} />
              <input type="number" defaultValue={0} />
            </div>
          </div>

       </section>
       
<section className="station-details-card">
  <div className="station-card-heading">
    <span className="station-step-number">4</span>
    <h2>Opening hours</h2>
  </div>

  <div className="opening-hours-options">
    <button type="button" className="hours-option">
      Open 24 hours
    </button>

    <button type="button" className="hours-option active">
      Set hours
    </button>
  </div>

  <div className="opening-hours-list">
    
      <div className="opening-hours-row">
        <span className="opening-day">From</span>

        <div className="opening-time-inputs">
          <input
            type="time"
            aria-label={`opening time`}
            defaultValue="06:00"
          />

          <span className="time-separator">to</span>

          <input
            type="time"
            aria-label={`closing time`}
            defaultValue="22:00"
          />
        </div>
      </div>
    
  </div>
</section>

<section className="station-details-card">
           <div className="station-ready-message">
  <div className="station-ready-icon">✓</div>

  <div className="station-ready-text">
    <h3>Ready to go live?</h3>
    <p>
      You can edit every detail later from My station.
    </p>
  </div>
</div> 

<div className="station-form-actions">
  <button
    type="button"
    className="cancel-station-btn"
    onClick={() => window.history.back()}
  >
    Cancel
  </button>

  <button type="submit" className="add-station-btn">
    Add Station to the map
  </button>
</div>
</section>


            </main>
    </div>
  );
}
