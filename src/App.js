import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Header from "./components/Header";
import Map from "./components/Map";

function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [stores, setStores] = useState([]);
  const [map, setMap] = useState(null);
  const [message, setMessage] = useState("");
  const fetchStores = async (ne_lat, ne_lng, sw_lat, sw_lng) => {
    const url = `https://munddi.com/dev/pdvs?ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}`;

    axios.get(url).then((res) => {
      setIsFetching(false);
      if (res.data.code === 200) {
        let fetchedStores = res.data.data;
        setStores(fetchedStores);
        if (fetchedStores.length) {
          setMessage(`${fetchedStores.length} lojas encontradas.`);
        } else {
          setMessage(
            "Nenhuma loja encontrada próxima a você. Tente diminuir o zoom ou arrastar o mapa para encontrar lojas em outras regiões."
          );
        }
      } else {
        setMessage("Oops! Algo deu errado. Tente novamente.");
      }
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsFetching(true);
      navigator.geolocation.getCurrentPosition((pos) =>
        setUserPosition([pos.coords.latitude, pos.coords.longitude])
      );
      fetchStores();
    } else {
      setIsFetching(false);
    }
  }, []);

  const getBoundsCoords = () => {
    let northEast = map.getBounds()._northEast;
    let southWest = map.getBounds()._southWest;
    let ne_lat = northEast.lat;
    let ne_lng = northEast.lng;
    let sw_lat = southWest.lat;
    let sw_lng = southWest.lng;
    fetchStores(ne_lat, ne_lng, sw_lat, sw_lng);
  };

  useEffect(() => {
    if (map) {
      getBoundsCoords();
      map.on("moveend", function () {
        getBoundsCoords();
      });
    }
  }, [map]);

  return (
    <div className="App">
      <Header />
      {!!userPosition.length && (
        <Map
          stores={stores}
          userPosition={userPosition}
          isFetching={isFetching}
          setMap={setMap}
        />
      )}
    </div>
  );
}

export default App;
