import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../infoGame";
//Inicio
export default function TabsGame(props) {
  // props
  const { game } = props;
  // constantes
  const panes = [
    {
      menuItem: "Informacion",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      ),
    },
  ];
  return <Tab className="tabs-game" panes={panes} />;
}
