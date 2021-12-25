import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ShuffleTwoToneIcon from '@mui/icons-material/ShuffleTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';

import EditDeckListModal from './DeckList/EditDecklistButton';
import { getDecklist, getAllCards } from '../../../store/current_list';
import DeckList from './DeckList';

const DeckListView = () => {
  const { decklistId } = useParams();
  const decklist = useSelector((state) => state.current_list);
  const sessionUser = useSelector((state) => state.session.user);

  let owner = false;
  if (+decklist.owner_id === +sessionUser?.id) {
    owner = true;
  }

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getDecklist(decklistId));
      await dispatch(getAllCards(decklistId));
    })();
  }, [dispatch, decklistId]);

  return (
    <div className="deck-view-container">
      <div className="deck-info-container">
        <div className="deck-title">
          {decklist.has_image ? (
            <div
              className="deck-cover"
              style={{
                backgroundImage: `url(${decklist.cover_photo_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          ) : null}
          <div>{decklist.title}</div>
        </div>
        <div className="study-buttons">
          {decklist.all_cards && (
            <h4>{decklist.all_cards.length} Cards in List</h4>
          )}
          {decklist.all_cards && sessionUser ? (
            <button
              onClick={() => history.push(`/decklists/${decklist.id}/study`)}
              className="deck-view-button"
            >
              <SchoolTwoToneIcon />
              Study Decklist
            </button>
          ) : (
            <p>Log in to study decklist!</p>
          )}
          {decklist.all_cards && sessionUser ? (
            <button
              onClick={() =>
                history.push(`/decklists/${decklist.id}/shuffled-study`)
              }
              className="deck-view-button"
            >
              <ShuffleTwoToneIcon /> Shuffle Decklist
            </button>
          ) : null}
        </div>
        <div className="deck-buttons">
          {owner && (
            <>
              <button className="deck-view-button">
                <AddCircleTwoToneIcon />
                Add Deck
              </button>
              <EditDeckListModal />
            </>
          )}
        </div>
        <div className="deck-maker">
          <p>
            Created by: {decklist.creator} on{'  '}
            {new Date(decklist.created_on).toDateString()}
          </p>
        </div>
      </div>
      <div id="buffer-main"></div>
      <div className="card-list-container">
        <DeckList />
      </div>
      <div id="buffer-cards"></div>
    </div>
  );
};

export default DeckListView;