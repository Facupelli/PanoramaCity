import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type Property } from "~/types/model";

type Props = {
  properties: Property[];
  setActiveProperty: Dispatch<SetStateAction<string>>;
};

export default function MapMarkers({ properties, setActiveProperty }: Props) {
  const map = useGoogleMap();

  const [, setMarkers] = useState<Array<google.maps.Marker>>([]);

  useEffect(() => {
    if (!map) {
      return () => {};
    }

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

      marker.addListener("click", () => {
        setActiveProperty(property.id);
      });

      return marker;
    });

    new MarkerClusterer({
      markers: propertiesMarkers,
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 200 }),
    });

    map.setCenter(initialBounds.getCenter());

    setMarkers(propertiesMarkers);

    return () => {
      propertiesMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map]);

  return null;
}
