import React from "react";
import SideBar from "../SideBar";
import DeckView from "./DeckView";

const DeckViewPage = () => {
  return (
    <div className="main-page-grid-container">
      <SideBar className="side" />
      <DeckView className="main" />
    </div>
  );
}

export default DeckViewPage
