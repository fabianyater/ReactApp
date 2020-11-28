import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Api } from "../../Common/api";
import { Modal } from "antd";
import "./Comics.css";


const Comics = () => {
  const [comics, setComics] = useState([]);
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Api()
      .then((res) => setComics(res.data.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelected = (comic) => {
    setSelected(comic);
    setVisible(true);
  };
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  if (comics.length > 0) {
    return (
      <>
        <div className="comics-title">
          <h1>COMICS</h1>
          <h1>COMIC SELECCIONADO</h1>
        </div>
        <div className="comics-container">
          <div className="comics">
            {comics.map((comic) => {
              const { id, title, description, thumbnail } = comic;
              return (
                <ComicCard
                  key={id}
                  id={id}
                  title={title}
                  description={ description == null ? "Sin descripción" : description.slice(0, 250) + " ..." } 
                  thumbnail={ thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null }
                  onSelect={handleSelected}
                />
              );
            })}
            <Modal
              title={selected.title}
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <img src={selected.thumbnail} alt="Marvel Comics" height="190px" width="150px"></img>
              <p>{selected.description}</p>
            </Modal>
          </div>
          <div className="comics-details">
            <div className="selected-comics">
              <div>
                <ComicCard
                  title={selected.title}
                  description={selected.description}
                  thumbnail={selected.thumbnail}
                />
              </div>
            </div>
            <div className="comics-form">
              <div className="form-group">
                <label>Id: </label>
                <input type="text" name="id" />
              </div>
              <div className="form-group">
                <label>Título: </label>
                <input type="text" name="title" />
              </div>
              <div className="form-group">
                <label>Descripción: </label>
                <input type="text" name="description" />
              </div>
              <div className="form-group">
                <label>Imagen: </label>
                <input type="text" name="image" />
              </div>

              <input type="submit" name="submit" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div />;
};

export default Comics;
