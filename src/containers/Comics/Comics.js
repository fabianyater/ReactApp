import { Spin } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { comicActions } from '../../services/comics/comicSlice'
import React from "react";
import { ComicCard } from "../../components";
import "./Comics.css";

const Comics = () => {

  const { comics, loading, selected } = useSelector(state => state.comics)

  const dispatch = useDispatch()

  const handleSelect = (comics) => dispatch(comicActions.getSelecetedComic(comics))

  return (
    <>
      <div style={{ textAlign: "center" }}>{loading && <Spin size="large" />}</div>
      <div className="comics-container">
        <div className="comics">
          <h1>COMICS</h1>
          {comics?.approvedComics.map((comic) => {
            const { id } = comic;
            return (
              <ComicCard key={id} comic={comic} onSelect={handleSelect} />
            );
          })}
        </div>
        <div>
          {selected && <ComicCard comic={selected} />}
        </div>
      </div>
    </>
  );
};

export default Comics;