import React from "react";
import "./ComicCard.css";
const ComicCard = ({ id, title, description, thumbnail, onSelect }) => {
  const onClick = () => {
    if (onSelect) {
      onSelect({
        id,
        title,
        description,
        thumbnail,
      });
    }
  };
  <h1>COMICS</h1>;

  return (
    <div className="comic-card-container" onClick={onClick}>
      <img src={thumbnail} alt="Marvel Comics" />
      <div className="comic-card-content">
        <div className="card-title">
          <h3> {title} </h3>
        </div>
        <div className="card-description">
          <p>{description}</p>
        </div>
        {/*<div className="card-see-more">
            <p>
              <a href="#">Ver más...</a>
            </p>
          </div>*/}
      </div>
    </div>
  );
};

export default ComicCard;
