import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/basicLayout";
import { size } from "lodash";
import { getLastGameApi } from "../api/game";
import ListGames from "../components/listGames";
import Seo from "../components/Seo";
// Incio
export default function Home() {
  // state
  const [games, setGames] = useState(null);
  // Effect
  useEffect(() => {
    (async () => {
      const response = await getLastGameApi(50);
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    })();
  }, []);
  return (
    <BasicLayout className="home">
      <Seo />
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
