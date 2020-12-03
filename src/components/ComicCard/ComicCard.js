import React from "react";
import "./ComicCard.css";

const ComicCard = ({ comic, onSelect }) => {
  const { id, title, description, thumbnail } = comic;
  const onClick = () => {
    if (onSelect) {
      onSelect(comic);
    }
  };

  const image = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className="comic-card-container" onClick={onClick}>
      <img
        src={
          image ||
          "https://e.rpp-noticias.io/xlarge/2020/04/26/182718_933313.jpg"
        }
        alt="Marvel Comics"
      />
      <div className="comic-card-content">
        <div className="card-title">
          <h3> {title} </h3>
        </div>
        <div className="card-description">
          <p>
            {description == null
              ? "Sin descripción"
              : description.slice(0, 250) + "..."}
          </p>
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
