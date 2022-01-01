import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ShuffleTwoToneIcon from '@mui/icons-material/ShuffleTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';

import AddDeckButton from './AddDeckButton';
import EditDeckListModal from './EditDecklistButton';
import DeleteDecklistModal from './DeleteDecklistButton';
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
    <div className="deck-view-container splash-div">
      <div className="deck-info-container">
        <div className="deck-title">
          {decklist.has_image ? (
            <div
              className="deck-cover"
              style={{
                backgroundImage: `url(${decklist.cover_photo_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                border: '5px solid #157A6E',
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
            null
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
              <AddDeckButton />
              <EditDeckListModal />
              <DeleteDecklistModal />
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
        <DeckList
          decklist={decklist}
          decksObj={decklist['decks']}
          owner={owner}
        />
      </div>
      <div id="buffer-cards"></div>
    </div>
  );
};

export default DeckListView;
