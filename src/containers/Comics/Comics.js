import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Spin } from "antd";
import "./Comics.css";
import * as ComicTypes from '../../services/comics/comicTypes'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
const Comics = () => {
  const [comicss, setComics] = useState([]);
  const [selected, setSelected] = useState({});

  const { comics, loading } = useSelector(state => state.comics)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch({
      type: ComicTypes.GET_COMICS
    })
  }, []);
  /*  const handleSelected = (comic) => {
     setSelected(comic);
     setVisible(true);
   }; */

   console.log(comics)

    return (
      <>
        <div className="comics-container">
          {loading && <Spin size="large" />}
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
 
};

export default Comics;
