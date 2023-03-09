import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { useEffect, useState } from "react";
import { type Property } from "~/types/model";

type Props = {
  properties: Property[];
};

export default function MapMarkers({ properties }: Props) {
  const map = useGoogleMap();

  const [, setMarkers] = useState<Array<google.maps.Marker>>([]);

  useEffect(() => {
    if (!map) {
      return () => {};
    }

    const initialBounds = new google.maps.LatLngBounds();

    const propertiesMarkers = properties.map((property) => {
      const position = { lat: property.locationLat, lng: property.locationLng };

      const markerOptions = {
        map,
        position,
        title: property.description,
        clickeable: false,
      };

      initialBounds.extend(position);

      return new google.maps.Marker(markerOptions);
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
