import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ClassTwoToneIcon from '@mui/icons-material/ClassTwoTone';
import CollectionsBookmarkTwoToneIcon from '@mui/icons-material/CollectionsBookmarkTwoTone';
import './Sidebar.css';
import { getRecentDecks, getMyDecks } from '../../store/my_decks';
import { getMyCollections } from '../../store/collections';

const SideBar = () => {
  const my_decks = useSelector((state) => state.my_decks);
  const my_collections = useSelector((state) => state.collections);
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!sessionUser) await dispatch(getRecentDecks());
      else {
        await dispatch(getMyDecks(sessionUser.id));
        await dispatch(getMyCollections(sessionUser.id));
      }
    })();
  }, [dispatch, sessionUser]);

  const deck_links = () => {
    let links = [];
    if (sessionUser) {
      for (let list in my_collections) {
        let link = (
          <div key={`side list ${list}`} className="sidebar-deck">
            <div className="deck-icon-container">
              <CollectionsBookmarkTwoToneIcon className="deck-icon" />
            </div>
            <NavLink className="sidebar-deck-link" to={`/collections/${list}`}>
              {my_collections[list]?.title.length > 23
                ? my_collections[list]?.title.slice(0, 24) + '...'
                : my_collections[list]?.title}
            </NavLink>
          </div>
        );
        links.push(link);
      }
    }
    if (sessionUser)
      links.push(
        <div key={'deck link'}>
          <h3>My Decks</h3>
        </div>
      );
    for (let deck in my_decks) {
      let link = (
        <div key={`side deck ${deck}`} className="sidebar-deck">
          <div className="deck-icon-container">
            <ClassTwoToneIcon className="deck-icon" />
          </div>
          <NavLink className="sidebar-deck-link" to={`/decks/${deck}`}>
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
        {sessionUser ? (
          <>
            <div>
              <h3>My Collections</h3>
            </div>
            {my_decks ? deck_links() : null}
          </>
        ) : (
          <>
            <div>
              <h3>Recent Decks</h3>
            </div>
            {my_decks ? deck_links() : null}
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
