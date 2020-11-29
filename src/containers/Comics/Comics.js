import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Api } from "../../Common/api";
import { Modal } from "antd";
import "./Comics.css";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);
  const [newComic, setNewComic] = useState([]);

  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    description: "",
    thumbnail: {
      path: "",
      extension: "",
    },
  });

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

  const onChange = (e) => {
    if (e.target.name === "path" || e.target.name === "extension") {
      setInputs({
        ...inputs,
        thumbnail: {
          ...inputs.thumbnail,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const save = () => {
    setNewComic([...newComic, { ...inputs }]);
  };

  console.log(save);

  if (comics.length > 0) {
    return (
      <>
        <div className="comics-container">
          <div className="comics">
            <h1>COMICS</h1>
            {[...newComic, ...comics].map((comic) => {
              const { id, title, description, thumbnail } = comic;
              return (
                <ComicCard
                  key={id}
                  id={id}
                  title={title}
                  description={
                    description == null
                      ? "Sin descripción"
                      : description.slice(0, 250) + " ..."
                  }
                  thumbnail={
                    thumbnail
                      ? `${thumbnail.path}.${thumbnail.extension}`
                      : null
                  }
                  onSelect={handleSelected}
                />
              );
            })}
            <Modal
              title={selected.title}
              //visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <img
                src={selected.thumbnail}
                alt="Marvel Comics"
                height="190px"
                width="150px"
              ></img>
              <p>{selected.description}</p>
            </Modal>
          </div>
          <div className="comics-details">
            <h1>COMICS SELECCIONADO</h1>
            <div className="selected-comics">
              <div>
                <ComicCard
                  title={selected.title}
                  description={selected.description}
                  thumbnail={selected.thumbnail}
                />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="comics-form">
                <div className="form-group">
                  <label>Id: </label>
                  <input type="text" name="id" onChange={onChange} />
                </div>
                <div className="form-group">
                  <label>Título: </label>
                  <input type="text" name="title" onChange={onChange} />
                </div>
                <div className="form-group">
                  <label>Descripción: </label>
                  <input type="text" name="description" onChange={onChange} />
                </div>
                <div className="form-group">
                  <label>Path: </label>
                  <input type="text" name="path" onChange={onChange} />
                </div>
                <div className="form-group">
                  <label>Extension: </label>
                  <input type="text" name="extension" onChange={onChange} />
                </div>
                <button className="bton" onClick={save}></button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  return <div Hola />;
};

export default Comics;
