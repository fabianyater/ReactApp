import React, { useState, useEffect } from 'react'
import { ColumnCard } from '../../components'
import { Api } from '../../Common/api'
import './ManageComics.css'

const ManageComics = () => {
  const [comics, setComics] = useState({
    newComics: [], reviewCommics: [], approvedComics: []
  });

  useEffect(() => {
    Api()
      .then((res) => setComics({ ...comics, newComics: res.data.results }))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = comic => {
    switch (comic.state) {
      case 'NEW':
        comic.state = 'REVIEW'
        setComics({
          ...comics,
          newComics: comics.newComics.filter(i => i.id !== comic.id),
          reviewCommics: [...comics.reviewCommics, comic]
        })
        return comic
      case 'REVIEW':
        comic.state = 'APPROVED'
        setComics({
          ...comics,
          reviewCommics: comics.reviewCommics.filter(i => i.id !== comic.id),
          approvedComics: [...comics.approvedComics, comic]
        })
        return comic
      case 'APPROVED':
        setComics({
          ...comics,
          approvedComics: comics.approvedComics.filter(i => i.id !== comic.id),
          newComics: [...comics.newComics, comic]
        })
        return comic
      default:
        comic.state = ''
        return comic
    }
  }
  const assignState = (otherComics, state) => (otherComics.map(i => ({ ...i, state })))

  return (
    <>
      <div className="manage-container">
        
        <ColumnCard comics={assignState(comics.newComics, 'NEW')} onSelect={handleSelect} title="Nuevos comics" />
        <ColumnCard comics={assignState(comics.reviewCommics, 'REVIEW')} onSelect={handleSelect} title="En revisión" />
        <ColumnCard comics={assignState(comics.approvedComics, 'APPROVED')} title="Aprobados" />
      </div>
    </>

  )
}

export default ManageComics