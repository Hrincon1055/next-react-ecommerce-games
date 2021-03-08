import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/basicLayout";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../components/game/headerGame";
import TabsGame from "../components/game/tabsGame";
import Seo from "../components/Seo";
// Inicio
export default function Game() {
  // state
  const [game, setGame] = useState(null);
  // constantes
  const { query } = useRouter();
  // effect
  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);
  if (!game) return null;
  return (
    <BasicLayout className="game">
      <Seo title={game.title} />
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
