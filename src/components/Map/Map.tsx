import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
// import {
//   MarkerClusterer,
//   SuperClusterAlgorithm,
// } from "@googlemaps/markerclusterer";
import { Dispatch, SetStateAction, useState } from "react";
import { type Property } from "~/types/model";

import MapMarkers from "./MapMarkers";

type Props = {
  properties: Property[];
  setActiveProperty: Dispatch<SetStateAction<string>>;
};

export default function Map({ properties, setActiveProperty }: Props) {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  // const addMarkers = (map: any) => {
  //   const markers = properties.map((property: Property) => {
  //     const marker = new google.maps.Marker({
  //       position: { lat: property.locationLat, lng: property.locationLng },
  //     });

  //     marker.addListener("click", () => setActiveProperty(property.id));

  //     return marker;
  //   });

  //   new MarkerClusterer({
  //     markers,
  //     map,
  //     algorithm: new SuperClusterAlgorithm({ radius: 200 }),
  //   });
  // };

  // const onLoad = useCallback((map: any) => addMarkers(map), []);

  const mapOptions = {
    zoom: 12,
    center: {
      lat: -31.52471936821179,
      lng: -68.5823669732075,
    },
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      // onLoadMap={onLoad}
    >
      <div className="h-screen" ref={(node) => setMapContainer(node)}>
        <MapMarkers properties={properties} />
      </div>
    </GoogleMapsProvider>
  );
}
