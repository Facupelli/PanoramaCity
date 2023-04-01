import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
} from "react";
import MapCanvas from "./MapCanvas";
import MapMarkers from "./MapMarkers";

import { type Property } from "~/types/model";

type Props = {
  properties: Property[];
  setActiveProperty: Dispatch<SetStateAction<Property | null>>;
};

const NEXT_PUBLIC_GOOGLE_MAP_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

export default function Map({ properties, setActiveProperty }: Props) {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const mapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setMapContainer(node);
    },
    []
  );

  const mapOptions = {
    zoom: 12,
    center: {
      lat: -31.52471936821179,
      lng: -68.5823669732075,
    },
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: 3, // Right top
    },
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={NEXT_PUBLIC_GOOGLE_MAP_KEY}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
    >
      {/* <div className="h-screen" ref={(node) => setMapContainer(node)}> */}
      <MapCanvas ref={mapRef} />
      <MapMarkers
        properties={properties}
        setActiveProperty={setActiveProperty}
      />
      {/* </div> */}
    </GoogleMapsProvider>
  );
}

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
