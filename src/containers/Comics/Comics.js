import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Modal, Spin, Form, InputNumber, Button, Input } from "antd";
import { Api } from "../../Common/api";
import * as validation from "./Validation";
import "./Comics.css";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);
  const [newComic, setNewComic] = useState([]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const onFinishFailed = (res) => {
    console.log(res);
  };

  const onFinish = (values) => {
    setNewComic([...newComic, { ...values }]);
  };

  console.log("algo " + onFinish);

  useEffect(() => {
    Api()
      .then((res) => setComics(res.data.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelected = (comic) => {
    setSelected(comic);
    setVisible(true);
  };
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  if (comics.length > 0) {
    return (
      <>
        <div className="comics-container">
          <div className="comics">
            <h1>COMICS</h1>
            {[...newComic, ...comics].map((comic) => {
              const { id } = comic;
              return (
                <ComicCard key={id} comic={comic} onSelect={handleSelected} />
              );
            })}
            <Modal
              title={selected.title}
              //visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <img
                src={selected.thumbnail}
                alt="Marvel Comics"
                height="190px"
                width="150px"
              />
              <p>{selected.description}</p>
            </Modal>
          </div>
          <div className="comics-details">
            <h1>COMIC SELECCIONADO</h1>
            <div className="selected-comics">
              <div>{selected && <ComicCard comic={selected} />}</div>
            </div>
            <Form
              {...layout}
              name="new-comic"
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
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </div>
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
