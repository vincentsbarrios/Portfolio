import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Divider,
    DatePicker,
} from "antd";
import MaskedInput from "antd-mask-input";
import { create, update, findById2 } from "../../referenceCommunityAgentHealthPromoterService";
import {navigate} from "@reach/router";

export interface ReferenceACSPSForm {
    [key: string]: string;
}

function ReferenceACSPSInformationEdit(props: any) {
    const { current, length, changeCurrent } = props;
    const [form] = Form.useForm();

    const prev = () => {
        let value = current - 1;
        changeCurrent(value);
    };

    useEffect(() => {
        (async () => {

            const referenceACSPSEdit = await findById2(props.passId ?? 1);

            form.setFieldsValue(
                {
                    motive: referenceACSPSEdit.motive,
                    referrer: referenceACSPSEdit.referrer,
                    phone: referenceACSPSEdit.referrerPhone,
                    email: referenceACSPSEdit.referrerEmail,
                    action: referenceACSPSEdit.actionTaken,
                })
        })();
    }, []);

    const onFinish = (values: ReferenceACSPSForm) => {
        (async () => {
            try {
                await update({
                    Id: parseInt(props.passId),
                    date: new Date("09/03/2020"),
                    community: "Not Set",
          					patientId: props.referenceState.patientId,
                    motive: values.motive,
                    referrer: values.referrer,
                    referrerPhone: values.phone,
                    referrerEmail: values.email,
                    actionTaken: values.action,
                    originHfId: props.referenceState.originHfId,
                    destinationHfId: props.referenceState.destinationHfId,
                });

                form.resetFields();
								navigate('/referenceACSPSForm');
                message.success("Elementos se han guardado exitosamente.");
            } catch (error) {
                console.log(error);
                message.error("Ocurri?? un error al guardar los elementos.");
            }
        })();
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
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                id="form-register"
            >
                <Form.Item
                    name="motive"
                    label="Motivo de la Referencia"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "Motivo debe tener m??nimo 2 letras y m??ximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-Z????????????????????????????0-9.??!???)()+-/])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="action"
                    label="Acci??n Realizada"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "Acci??n debe tener m??nimo 2 letras y m??ximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-Z????????????????????????????0-9.??!???)()+-/])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="referrer"
                    label="Nombre del que lo refiere"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "Nombre debe tener m??nimo 2 letras y m??ximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-Z????????????????????????????])+\s?)+$/g,
                            message: "S??lo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "Nombre es un campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="N??mero de Tel??fono"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /\d{4}/,
                            message: "N??mero de Tel??fono incompleto. ",
                        },
                    ]}
                >
                    <MaskedInput mask="+(111) 1111-1111" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Correo electr??nico"
                    rules={[
                        {
                            required: true,
                            message: "Correo electr??nico es un campo requerido",
                            whitespace: true,
                        },
                        {
                            type: "email",
                            message: "Correo debe estar en formato: ejemplo@ejemplo.com",
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
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reiniciar campos
          </Button>
                    {current > 0 && (
                        <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                            Anterior
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
}

export default ReferenceACSPSInformationEdit;
