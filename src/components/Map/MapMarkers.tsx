import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { type Property } from "~/types/model";

type Props = {
  properties: Property[];
  setActiveProperty: Dispatch<SetStateAction<string>>;
};

export default function MapMarkers({ properties, setActiveProperty }: Props) {
  const map = useGoogleMap();

  const prevClusterRef = useRef<MarkerClusterer>();
  const prevMarkersRef = useRef<google.maps.Marker[]>([]);

  function clearMarkers(markers: google.maps.Marker[]) {
    for (const marker of markers) {
      marker.setMap(null);
    }
  }

  useEffect(() => {
    if (!map) {
      return;
    }

    clearMarkers(prevMarkersRef.current);
    prevMarkersRef.current = [];
    prevClusterRef.current?.clearMarkers();

    const initialBounds = new window.google.maps.LatLngBounds();

    const propertiesMarkers = properties.map((property) => {
      const position = { lat: property.locationLat, lng: property.locationLng };

      const markerOptions = {
        map,
        position,
        title: property.description,
        clickeable: false,
      };

      initialBounds.extend(position);

      const marker = new window.google.maps.Marker(markerOptions);
      prevMarkersRef.current.push(marker);

      marker.addListener("click", () => {
        setActiveProperty(property.id);
      });

      return marker;
    });

    const newClusterer = new MarkerClusterer({
      markers: prevMarkersRef.current,
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 200 }),
    });
    prevClusterRef.current = newClusterer;

    map.setCenter(initialBounds.getCenter());

    return () => {
      propertiesMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map, properties, setActiveProperty]);

  return null;
}
