import { Button, Divider, Form, Input, Spin } from "antd";
import MaskedInput from "antd-mask-input/build/main/lib/MaskedInput";
import TextArea from "antd/lib/input/TextArea";
import Select from "antd/lib/select";
import React, { useEffect, useState } from "react";
import { searchById } from "../../../patients/patientService"
import { Patient } from "../../../patients/patientModels";
import { PatientReferenceInformation, RRForm, ReferenceEditPatience } from "../../referenceFormModels";
import { findById2 } from "../../referenceFormService";
import { findById } from "../../../patients/patientService";

export default function PatientReferenceEdit(props: any) {
    const { Option } = Select;
    const { current, changeCurrent } = props;
    const [fetching, setFetching] = useState(true);
    const [patients, setPatients] = useState([] as Patient[]);
    const [patient, setPatient] = useState({} as Patient);
    const { referenceId, setReferenceId, a } = props;
    const [form] = Form.useForm();
    const [hiddenPatientInfo, setHiddenPatientInfo] = useState(false);
    const [idPatient, setIdPatient] = useState("");
    const [namePatient, setNamePatient] = useState("");
    const [currentHospital, setCurrentHospital] = useState({} as RRForm)
    const [identity, setIdentity] = useState('null')

    const fetchPatient = async (value: string) => {

        setFetching(true);
        const patients = await searchById(value);
        setPatients(patients);
        setFetching(false);
    };

    const handleChange = async (value: any) => {
        const foundPatient = patients.find(p => p.id === value);
        setPatient(foundPatient!);
        const patientTemp = foundPatient;
        if (patientTemp !== undefined) {
            setIdPatient(patientTemp.idNumber);
            setNamePatient(patientTemp.name);
            setHiddenPatientInfo(false);
        }
    };

    useEffect(() => {
        (async () => {
            console.log(props.passId)
            const hospital = await findById2(props.passId ?? 1);
            const demo = await findById(hospital.patientId ?? 1);
            const referenceEdit = await findById2(props.passId ?? 1);
            setIdentity(demo.idNumber)
            await fetchPatient(referenceEdit.patientId.toString());
            form.setFieldsValue(
                {
                    patient: demo.idNumber,
                    patientId: demo.idNumber,
                    patientName: demo.name,
                    name: referenceEdit.companion,
                    lastName: demo.firstLastName,
                    phoneNumber: referenceEdit.phone,
                    relationShip: referenceEdit.relationship,
                    address: referenceEdit.address
                })
						setPatient(demo)

        })();
    }, []);

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

    const onFinish = (values: any) => {

        props.setPatientInfo({
            companion: values.name,
            phone: values.phoneNumber,
            address: values.address,
            relationship: values.relationShip,
            patientId: patient.id,
            selectedPatient: patient
        } as PatientReferenceInformation)
        changeCurrent(current + 1);
    }

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
            md: {
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
                initialValues={{ name: 'data' }}
            >
                <Divider orientation="left">Paciente</Divider>
                <Form.Item label="Paciente" name="patient">
                    <Select
                        showSearch
                        placeholder="Seleccionar paciente"
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={fetchPatient}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        defaultValue='0501'

                    >
                        {patients.map((d) => (
                            <Option
                                key={d.idNumber}
                                value={d.id}
                            >{`${d.name} ${d.firstLastName}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="patientId"
                    label="Información del Paciente"
                    hidden={hiddenPatientInfo}
                >
                    <Input
                        placeholder="Número de identidad"
                        disabled
                        value={patient.idNumber}
                        style={{ marginBottom: "20px" }} />
                    <Input
                        placeholder="Nombre"
                        disabled
                        value={patient.name}
                    />

                </Form.Item>
                <Divider orientation="left">Acompañante</Divider>
                <Form.Item
                    name="name"
                    label="Primer nombre"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Primer apellido"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Número de Teléfono"
                >
                    <MaskedInput mask="+(111) 1111-1111" />
                </Form.Item>
                <Form.Item
                    name="relationShip"
                    label="Parentesco"
                >
                    <Select
                        showSearch
                        placeholder="Selecciona tipo parentesco."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Padre o Madre">Padre o Madre</Option>
                        <Option value="Hijo">Hijo</Option>
                        <Option value="Abuelo">Abuelo</Option>
                        <Option value="Hermano">Hermano</Option>
                        <Option value="Nieto">Nieto</Option>
                        <Option value="Tío">Tío</Option>
                        <Option value="Primo">Primo</Option>
                        <Option value="Sobrino">Sobrino</Option>
                        <Option value="Suegro">Suegro</Option>
                        <Option value="Yerno o Nuera">Yerno o Nuera</Option>
                        <Option value="Padrastro o Madrastra">Padrastro o Madrastra</Option>
                        <Option value="Hermanastro">Hermanastro</Option>
                        <Option value="Cuñado">Cuñado</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Dirección"

                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType={"submit"} style={{ margin: "0 8px" }}>
                        Siguiente
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reiniciar campo
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
