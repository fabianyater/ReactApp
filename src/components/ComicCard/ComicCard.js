import React from "react";
import "./ComicCard.css";

const ComicCard = ({ title, description, thumbnail }) => {
  return (
    <div className="comic-card-container">
      <img
        src={
          thumbnail ||
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
              : description.slice(0, -80) + " ..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
