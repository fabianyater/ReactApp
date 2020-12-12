import React from 'react'
import ComicCard from '../ComicCard/ComicCard'
import { Layout } from 'antd'
import './ColumnCard.css'

const { Header, Content } = Layout

const ManageCard = ({ title = 'Title', comics = [], onSelect, state }) => {

  return (
    <>
      <Layout className="column-card-container">
        <Header className="header-column">{title}</Header>
        <Content>
          {comics.map(comic => <ComicCard comic={comic} key={comic.id} onSelect={onSelect} allowClick='true'/>)}
        </Content>
      </Layout>
    </>
  )
}

export default ManageCard