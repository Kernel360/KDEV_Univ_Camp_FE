import React from "react";
import Map from "@@/InfoPage/Map";
import Distance from "@@/InfoPage/Distance";
import "@@/InfoPage/infoPage.css";

export default function InfoPage() {
  return (
    <div className="info-page">
      <h1 className="info-title">Info</h1>
      <div className="info-content">
        <div className="map-section">
          <div className="map-wrapper">
            <Map />
          </div>
        </div>
        <div className="distance-section">
          <Distance />
        </div>
      </div>
    </div>
  );
}
