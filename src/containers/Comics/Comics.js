import { Spin, Modal, Row, Button, Form, InputNumber, Input } from "antd";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { comicActions } from '../../services/comics/comicSlice'
import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import * as validation from "./Validation";
import "./Comics.css";

const Comics = () => {

  const [visible, setVisible] = useState(false);
  const { comics, loading, selected } = useSelector(state => state.comics)

  const dispatch = useDispatch()

  useEffect(() => dispatch(comicActions.getComics()), []);

  const handleSelect = (comics) => dispatch(comicActions.getSelecetedComic(comics))
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);
  const handleModal = () => setVisible(true)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const onFinishFailed = (res) => console.log(res)

  const onFinish = (comics) => {
    dispatch(comicActions.addComic(comics))
    setVisible(false)
  };

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
  return (
    <>
      <div><Button type="primary" onClick={handleModal} >Agregar nuevo Comic</Button></div>
      <div style={{textAlign: "center"}}>{loading && <Spin size="large" />}</div>
      <div className="comics-container">
        <div className="comics">
          <h1>COMICS</h1>
          {[...comics].map((comic) => {
            const { id } = comic;
            return (
              <ComicCard key={id} comic={comic} onSelect={handleSelect} />
            );
          })}
        </div>
        <div>
          {selected && <ComicCard comic={selected} />}
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
              onFinish={onFinish}
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
        </div>
      </div>
    </>
  );
};

export default Comics;