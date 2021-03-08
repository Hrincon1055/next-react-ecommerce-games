import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../../layouts/basicLayout";
import { useRouter } from "next/router";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../api/game";
import ListGames from "../../components/listGames";
import Pagination from "../../components/pagination";
const limitperPage = 20;
// Inicio
export default function Platform() {
  // state
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);
  // Constantes
  const { query } = useRouter();

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * limitperPage - limitperPage;
  };
  // effect
  useEffect(() => {
    (async () => {
      const response = await getGamesPlatformApi(
        query.platform,
        limitperPage,
        getStartItem()
      );
      setGames(response);
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform);
      setTotalGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitperPage={limitperPage}
        />
      ) : null}
    </BasicLayout>
  );
}
