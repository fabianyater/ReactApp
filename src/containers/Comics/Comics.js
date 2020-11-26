import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Api } from "../../Common/api";
import "./Comics.css";

const Comics = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    Api()
      .then((res) => setComics(res.data.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(comics);

  if (comics.length > 0) {
    return (
      <div>
        {comics.map((comic) => {
          const { id, title, description, thumbnail } = comic;
          return (
            <ComicCard
              key={id}
              title={title}
              description={description}
              thumbnail={
                thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null
              }
            />
          );
        })}
      </div>
    );
  }

  return <div />;
};

export default Comics;
