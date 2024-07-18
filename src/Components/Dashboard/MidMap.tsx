import { FC, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const MidMap: FC<any> = ({ value }) => {
  const [coordinates, setCoordinates] = useState<[number, number]>([48.8566, 2.3522])
  const mapRef = useRef(null);
  const MAP_ZOOM = 13;

  let LAT: number
  let LON: number

  //useEffect
  useEffect(() => {
    if (value) {
      const { Latitude, Longitude } = value
      if (Latitude?.value && Longitude?.value) {
        setCoordinates([Latitude?.value, Longitude?.value])
      } else {
        setCoordinates([48.8566, 2.3522])
      }
    }
    if (value === undefined) {
      setCoordinates([48.8566, 2.3522])
    }
    if (mapRef.current !== null) {
      LAT = coordinates[0];
      LON = coordinates[1];
      //@ts-ignore
      mapRef.current.center = [LAT, LON];
      //@ts-ignore
      mapRef.current.zoom = MAP_ZOOM;
      if (!(LAT === 0 || LON === 0)) {
        //@ts-ignore
        mapRef.current.flyTo([LAT, LON], MAP_ZOOM);
      }
    }
  }, [value])

  //render
  return (
    <div id="mid">
      <MapContainer
        center={coordinates}
        zoom={MAP_ZOOM}
        ref={mapRef}
        zoomControl={false}
      >
        <TileLayer url={MAP_URL} />
        <Marker
          key={0}
          position={coordinates}
          ref={mapRef.current}
        >
        </Marker>
      </MapContainer>

    </div>
  );
};

export { MidMap };
