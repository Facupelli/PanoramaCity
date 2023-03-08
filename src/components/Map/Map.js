/* eslint-disable */
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  MarkerClustererF,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Map({
  properties,
  setActiveProperty,
  activeProperty,
  zoom,
  bounds,
  center,
  iconSize,
}) {
  const [map, setMap] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });

  const centerValue = useMemo(() => ({ lat: center[0], lng: center[1] }), []);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && bounds && properties?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      properties?.map((property) => {
        bounds.extend({
          lat: property.locationLat,
          lng: property.locationLng,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, properties, bounds]);

  function clusterMarkers(map, markers) {
    const clustererOptions = { imagePath: "../../img/m" };
    const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
  }

  const handleMarkerClick = (id) => {
    if (id === activeProperty) {
      return;
    }
    setActiveProperty(id);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={centerValue}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => setActiveProperty("")}
    >
      {properties?.length === 1 &&
        properties.map(({ id, locationLat, locationLng, type }) => (
          <MarkerF
            key={id}
            position={{ lat: locationLat, lng: locationLng }}
            // icon={{
            //   url: `${
            //     type.name === "Casa"
            //       ? "https://www.svgrepo.com/show/5123/house.svg"
            //       : "https://www.svgrepo.com/show/42498/building.svg"
            //   } `,
            //   scaledSize: {
            //     width: iconSize,
            //     height: iconSize,
            //   },
            // }}
            onClick={() => handleMarkerClick(id)}
          />
        ))}

      {properties?.length > 1 && (
        <MarkerClustererF
        // imagePath="./../img/m"
        >
          {(clusterer) =>
            properties?.map(({ id, locationLat, locationLng, type }) => (
              <MarkerF
                key={id}
                position={{ lat: locationLat, lng: locationLng }}
                // icon={{
                //   url: `${
                //     type.name === "Casa"
                //       ? "https://www.svgrepo.com/show/5123/house.svg"
                //       : "https://www.svgrepo.com/show/42498/building.svg"
                //   } `,
                //   scaledSize: {
                //     width: iconSize,
                //     height: iconSize,
                //   },
                // }}
                clusterer={clusterer}
                onClick={() => handleMarkerClick(id)}
              />
            ))
          }
        </MarkerClustererF>
      )}
    </GoogleMap>
  );
}
