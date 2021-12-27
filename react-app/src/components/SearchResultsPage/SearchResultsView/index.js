import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchResultsView = () => {
  const decksObj = useSelector((state) => state.search_results);
  const { term } = useParams();

  const history = useHistory();

  const createDeckLinks = () => {
    let links = [];
    for (let key in decksObj) {
      let link = (
        <div key={decksObj[key].id} className="deck-tile-container">
          <div
            onClick={() => history.push(`/decks/${decksObj[key].id}`)}
            className="deck-tile"
            style={{ border: `5px solid #${decksObj[key].color}` }}
          >
            <div className="deck-tile-title">
              <h1>{decksObj[key].title}</h1>
              <p>
                Created By: {decksObj[key].creator} on{' '}
                {new Date(decksObj[key].created_on).toDateString()}
              </p>
              <p>Cards: {decksObj[key].cards_amount}</p>
            </div>
            {decksObj[key].has_image ? (
              <div
                className="card-sticker deck-sticker"
                style={{
                  backgroundImage: `url(${decksObj[key].cover_photo_url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
            ) : null}
          </div>
        </div>
      );
      links.push(link);
    }
    return links;
  };

  return (
    <div className="main">
      <h1>Search Results for "{term}" </h1>
      {Object.keys(decksObj).length > 0 ? (
        createDeckLinks()
      ) : (
        <p>No search results for "{term}", try another search term!</p>
      )}
    </div>
  );
};

export default SearchResultsView;
