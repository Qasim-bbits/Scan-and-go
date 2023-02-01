/*global google*/
import React, { useState, useRef, useCallback } from "react";
import { LoadScript, GoogleMap, Polygon, Marker, DrawingManager, Autocomplete } from "@react-google-maps/api";
import Spinner from "../shared/Spinner";

const libraries = ["drawing", "places"];
const polygonOptions = {
  fillColor: "#14a7e0",
  fillOpacity: 0.5,
  strokeColor: "#14a7e0",
  strokeOpacity: 1,
  strokeWeight: 2,
  zIndex: 1
}

export default function Map(props){
  const [spinner, setSpinner] = useState(true);
  const [autocomplete, setAutocomplete ] = useState(null);
  const [mapLoad, setMapLoad ] = useState(false);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  const onPolygonComplete = (polygon, destroy = false) => {
    let coords = getPaths(polygon);
    props.setPolygon(coords);

    // // Destroys the polygon that has been drawn by the manager.
    if (destroy) {
      polygon.setMap(null);
    }
  };

  const getPaths = (polygon) => {
    var polygonBounds = polygon.getPath();
    var bounds = [];
    for (var i = 0; i < polygonBounds.length; i++) {
      var point = {
        lat: polygonBounds.getAt(i).lat(),
        lng: polygonBounds.getAt(i).lng()
      };
      bounds.push(point);
    }
    return bounds;
  }

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      props.setPolygon(nextPath);
    }
  }, [props.setPolygon]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  return (
    <div className="App" style={{height: props.height}}>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDcPvfjCIqeUpGe8_IaI_-5rIZX9qtCUnI"
        libraries={libraries}
        language="en"
        region="us"
        onLoad={()=>{setMapLoad(true);setSpinner(false)}}
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={props.center}
          zoom={props.zoom}
          version="weekly"
          on
          options={{
            mapTypeId: "satellite"
          }}
        >
          {props.editable && <Marker
            position={props.center}
          />}
          {props.editable && <Autocomplete
            onLoad={(e)=>setAutocomplete(e)}
            onPlaceChanged={()=>{
              props.setCenter({
                lat: autocomplete.getPlace().geometry.location.lat(),
                lng: autocomplete.getPlace().geometry.location.lng()
              })
              props.setZoom(18)
            }}
          >
            <input
              type="text"
              placeholder="Search Address..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `80%`,
                height: `40px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `12px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "10%",
                top: '10%',
              }}
            />
          </Autocomplete>}
          {props.editable && <Polygon
            editable
            path={props.polygon}
            options={polygonOptions}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />}
          {!props.editable &&<Polygon
            editable
            path={props.polygon}
            options={polygonOptions}
          />}
          {props.editable && mapLoad && <DrawingManager
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
              },
            }}
            onPolygonComplete={(polygon) => onPolygonComplete(polygon, true)}
          />}
        </GoogleMap>
      </LoadScript>
      <Spinner
        spinner = {spinner}
      />
    </div>
  );
}
