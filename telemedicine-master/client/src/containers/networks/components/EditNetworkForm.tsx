import React, { useEffect, useState } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input, message, Spin } from "antd";
import { findById, update, networkNameExists } from "../networkService";
import { NetworkForm } from "./AddNetworkForm";
import { RouteComponentProps, Link } from "@reach/router";
import { Network } from "../networkModels";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";

interface EditNetworkRouteParams {
  id: number;
}

interface EditNetworkFormProps
  extends RouteComponentProps<EditNetworkRouteParams> {}

function EditNetworkForm(props: EditNetworkFormProps) {
  const [form] = Form.useForm();
  const [network, setNetwork] = useState({} as Network);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const foundNetwork = await findById(props.id ?? 1);
      setNetwork(foundNetwork);
      form.setFieldsValue(foundNetwork);
      setLoading(false);
    })();
  }, []);

  const onFinish = (values: NetworkForm) => {
    (async () => {
      try {
        values.name = values.name.toLocaleLowerCase();
        await update({
          id: network.id,
          name: values.name.charAt(0).toUpperCase() + values.name.slice(1),
        });
        message.success("La red ha sido editada existosamente");
      } catch (error) {
        message.error("Ocurrió un error al editar la red");
      }
    })();
  };

  const validateName = async (rule: RuleObject, value: StoreValue) => {
    const name = value.toLowerCase();
    const exists = await networkNameExists(
      name.charAt(0).toUpperCase() + name.slice(1)
    );
    if (exists) {
      throw new Error(`Ya existe una red con el nombre ${name}`);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 8 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Link to="/networks">
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: "-20" }}
        ></Button>
      </Link>
      <MainTitle>Editar red</MainTitle>
      <Spin spinning={loading}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                pattern: /^.{5,15}$/g,
                message:
                  "Nombre de red debe tener mínimo 5 letras y máximo 15.",
              },
              {
                pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                message: "Sólo se permiten letras.",
              },
              {
                required: true,
                message: "Nombre de red es un campo requerido",
                whitespace: true,
              },
              {
                validator: validateName,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}

export default EditNetworkForm;
