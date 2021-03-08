import React from "react";
import TopBar from "./topBar";
import MenuWeb from "./menu";
// Inicio
export default function Header() {
  return (
    <div className="header">
      <TopBar />
      <MenuWeb />
    </div>
  );
}
