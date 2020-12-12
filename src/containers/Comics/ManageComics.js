import React, { useState, useEffect } from 'react'
import { Modal, Row, Button, Form, InputNumber, Input } from "antd";
import { ColumnCard } from '../../components'
import * as validation from "./Validation";
import { Api } from '../../Common/api'
import './ManageComics.css'

const ManageComics = () => {

  const [visible, setVisible] = useState(false);
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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const onFinishFailed = (res) => {
    console.log(res);
  };

  const onFinish = values => {
    console.log('valores: ', values)
    setComics([comics.newComics, { ...values }]);
  };

  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);
  const handleModal = () => setVisible(true)
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


  const modalFooter = (
    <>
      <Row>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" form="new-comic" >Agregar</Button>
        </Form.Item>
        <Form.Item>
          <Button style={{ marginLeft: '50px' }} type="ghost" onClick={handleCancel}>Cancelar</Button>
        </Form.Item>
      </Row>
    </>
  )
  console.log('Comics: ', comics)
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={handleModal} >Agregar nuevo Comic</Button>
      </div>
      <div className="manage-container">
        <Modal
          title="Nuevos comics"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={modalFooter}
        >
          <Form
            {...layout}
            name='new-comic'
            onFinish={handleSelect}
            onFinishFailed={onFinishFailed}
            validateMessages={validation.messages}
          >
            <Form.Item name="id" label="Id" rules={validation.schema.id}>
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="title"
              label="Título"
              rules={validation.schema.title}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              rules={validation.schema.description}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["thumbanail", "path"]}
              label="Path"
              rules={validation.schema.path}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["thumbanail", "extension"]}
              label="Extensión"
              rules={validation.schema.extension}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <ColumnCard comics={assignState(comics.newComics, 'NEW')} onSelect={handleSelect} title="Nuevos comics" />
        <ColumnCard comics={assignState(comics.reviewCommics, 'REVIEW')} onSelect={handleSelect} title="En revisión" />
        <ColumnCard comics={assignState(comics.approvedComics, 'APPROVED')} title="Aprovados" />
      </div>
    </>

  )
}

export default ManageComics