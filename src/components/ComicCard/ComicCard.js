import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Button, Row } from 'antd';

import { comicActions } from '../../services/comics/comicSlice';
import { AdminModal } from '../AdminModal/AdminModal';
import './ComicCard.css';

const ComicCard = ({ comic }) => {

  const [modalVisible, setModalVisible] = useState(false)

  const { id, title, description, thumbnail, state } = comic;

  const { comics } = useSelector(state => state.comics)

  const dispatch = useDispatch()

  let message = 'A revisar'
  let buttonType = 'primary'

  switch (comic.state) {
    case 'REVIEW':
      message = 'Añadir a la lista'
      buttonType = 'primary'
      break
    case 'APPROVED':
      message = 'Completado'
      buttonType = 'ghost'
      break
    default:
      message = 'Seleccionar'
      buttonType = 'text'
      break
  }

  const deletComic = () => {
    dispatch(comicActions.setComics({
      ...comics,
      reviewComics: comics.reviewComics.filter(i => i.id !== comic.id)
    }))
  }

  const onClick = () => {
    let newState
    switch (comic.state) {
      case 'NEW':
        comic.state = 'REVIEW';
        newState = {
          ...comics,
          newComics: comics.newComics.filter(i => i.id !== comic.id),
          reviewComics: [...comics.reviewComics, comic]
        }
        dispatch(comicActions.setComics(newState))
        break;
      case 'REVIEW':
        comic.state = 'APPROVED';
        newState = {
          ...comics,
          reviewComics: comics.reviewComics.filter(i => i.id !== comic.id),
          approvedComics: [...comics.approvedComics, comic]
        }
        dispatch(comicActions.setComics(newState))
        break;
      case 'APPROVED':
        comic.state = 'REVIEW';
        newState = {
          ...comics,
          approvedComics: comics.approvedComics.filter(i => i.id !== comic.id),
          reviewComics: [comic, ...comics.reviewComics]
        }
        dispatch(comicActions.setComics(newState))
        break;
      default:
        comic.state = '';
        break;
    }
  };


  const image = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className="comic-card-container">
      <img src={image || "https://e.rpp-noticias.io/xlarge/2020/04/26/182718_933313.jpg"} alt="Marvel Comics" />
      <div className="comic-card-content">
        <div className="card-title">
          <h3> {title} </h3>
        </div>
        <div className="card-description">
          <p>{description == null ? "Sin descripción" : description.slice(0, 150) + "..."}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
          {state == 'REVIEW' && (
            <>
              <Button type={buttonType} onClick={() => setModalVisible(true)} icon={<EditOutlined />}>Editar</Button>
              <Button type={buttonType} danger onClick={() => deletComic()} icon={<DeleteOutlined />}>Eliminar</Button>
            </>
          )}
        </div>
        <div className="card-see-more">
          <Row style={{ justifyContent: "center" }}>
            <Button type={buttonType} onClick={onClick}>{message}</Button>
          </Row>
        </div>
      </div>
      <AdminModal
        title="Actualizar comic"
        visible={modalVisible}
        setVisible={setModalVisible}
        comic={comic}
      />
    </div>
  );
};

export default ComicCard;
