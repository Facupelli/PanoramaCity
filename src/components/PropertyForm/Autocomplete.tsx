import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Autocomplete() {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });

  const [detail, setPlaceDetails] = useState();

  console.log(placePredictions);

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails: any) => setPlaceDetails(placeDetails)
      );
  }, [placePredictions]);

  return (
    <>
      <input
        placeholder="Debounce 500 ms"
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
        }}
        // loading={isPlacePredictionsLoading}
      />
      <ul>
        {placePredictions.map((place) => (
          <li key={place.place_id}>{place.description}</li>
        ))}
      </ul>
    </>
  );
}
