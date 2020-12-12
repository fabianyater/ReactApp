import { Button } from "antd";
import React from "react";
import "./ComicCard.css";

const ComicCard = ({ comic, onSelect, state = 'NEW', allowClick = false }) => {
  const { id, title, description, thumbnail } = comic;
  const onClick = () => {
    if (onSelect) {
      onSelect(comic);
    }
  };

  let message = 'A revisar'
  let buttonType = 'primary'
  switch (state) {
    case 'NEW':
      buttonType = 'primary'
      message = 'Pasar a revisión'
      break
    case 'REVIEW':
      buttonType = 'text'
      message = 'APROBAR'
      break
    case 'APPROVED':
      buttonType = 'text'
      message = 'Completado'
      break
    default:
      message = 'Sin estado'
      buttonType = 'danger'
      break
  }

  const image = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className="comic-card-container">
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
        <div className="card-see-more">
          <p>
            {allowClick && (
              <Button type={buttonType} onClick={onClick} >{message}</Button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
