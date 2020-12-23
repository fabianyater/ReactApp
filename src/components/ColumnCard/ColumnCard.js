import { Layout, Spin } from 'antd'
import React from 'react'
/* import { useSelector } from 'react-redux' */

import ComicCard from '../ComicCard/ComicCard'
import './ColumnCard.css'

const { Header, Content } = Layout


const ManageCard = ({ title = 'Title', comics = [], onSelect }) => {

  /* const { loading } = useSelector(state => state.comics) */

  return (
    <>
      {/* <div style={{ textAlign: "center" }}>{loading && <Spin size="large" />}</div> */}
      <Layout className="column-card-container">
        <Header style={{ background: 'transparent', fontSize: '1.5em' }}><h1>{title}</h1></Header>
        <Content>
          {comics.map(comic => <ComicCard comic={comic} key={comic.id} onSelect={onSelect} />)}
        </Content>
      </Layout>
    </>
  )
}

export default ManageCard