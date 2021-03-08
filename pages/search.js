import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/basicLayout";
import { searchGamesApi } from "../api/game";
import ListGames from "../components/listGames";
import Seo from "../components/Seo";
// Inicio
export default function search() {
  // constantes
  const { query } = useRouter();
  // state
  const [games, setGames] = useState(null);
  // effect
  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);
  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGamesApi(query.query);
        if (size(response) > 0) {
          setGames(response);
        } else {
          setGames([]);
        }
      } else {
        setGames([]);
      }
    })();
  }, [query]);
  return (
    <BasicLayout className="search">
      <Seo title={`Buscando : ${query.query}`} />
      {!games && <Loader active>Buscando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No se han encontrado juegos con {query.query} </h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}