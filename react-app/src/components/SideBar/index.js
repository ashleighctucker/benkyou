import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Sidebar.css';

const SideBar = () => {
  const my_decks = useSelector((state) => state.my_decks);

  const deck_links = () => {
    let links = [];
    for (let deck in my_decks) {
      let link = (
        <div className="sidebar-deck">
          <div
            className="deck-circle"
            style={{
              background: `url(${my_decks[deck].cover_photo_url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <NavLink
            className="sidebar-deck-link"
            to={`/decks/${deck}`}
            key={deck}
          >
            {my_decks[deck].title.length > 23
              ? my_decks[deck].title.slice(0, 24) + '...'
              : my_decks[deck].title}
          </NavLink>
        </div>
      );
      links.push(link);
    }
    return links;
  };

  return (
    <div className="side">
      <div id="sidebar-buffer"></div>
      <div id="sidebar">
        <div>My Decks & Lists</div>
        {my_decks ? deck_links() : null}
      </div>
    </div>
  );
};

export default SideBar;
