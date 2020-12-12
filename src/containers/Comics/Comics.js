import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Spin } from "antd";
import { Api } from "../../Common/api";
import "./Comics.css";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [selected, setSelected] = useState({});


  useEffect(() => {
    Api()
      .then((res) => setComics(res.data.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*  const handleSelected = (comic) => {
     setSelected(comic);
     setVisible(true);
   }; */

  if (comics.length > 0) {
    return (
      <>
        <div className="comics-container">
          <div className="comics">
            <h1>COMICS</h1>
            {[...comics].map((comic) => {
              const { id } = comic;
              return (
                <ComicCard key={id} comic={comic} />
              );
            })}
          </div>
          {/* <div className="comics-details">
            <h1>COMIC SELECCIONADO</h1>
            <div className="selected-comics">
              <div>{selected && <ComicCard comic={selected} />}</div>
            </div>
          </div> */}
        </div>
      </>
    );
  }
  return (
    <div className="loading-container">
      <div>
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Comics;
