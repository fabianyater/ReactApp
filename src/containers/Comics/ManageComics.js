import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { Button } from 'antd'

import { AdminModal } from '../../components/AdminModal/AdminModal'
import { ColumnCard } from '../../components'
import './ManageComics.css'

const ManageComics = () => {

  const [modalVisible, setModalVisible] = useState(false)

  const { comics } = useSelector(state => state.comics)

  const assignState = (otherComics, state) => (
    otherComics.map(i => ({ ...i, state }))
  );

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setModalVisible(true)} >Agregar nuevo Comic</Button>
        <div className='manage-container'>
          <ColumnCard
            comics={assignState(comics.newComics, 'NEW')}
            title='NUEVOS COMICS'
          />
          <ColumnCard
            comics={assignState(comics.reviewComics, 'REVIEW')}
            title='EN REVISIÓN'
          />
          <ColumnCard
            comics={assignState(comics.approvedComics, 'APPROVED')}
            title='APROVADOS'
          />
        </div>
        <AdminModal
          visible={modalVisible}
          setVisible={setModalVisible}
          title="Crear comic"
        />
      </div>
    </>
  )
}

export default ManageComics