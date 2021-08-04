import {Button, Divider, Form, Input, Space, Spin} from "antd";
import MaskedInput from "antd-mask-input/build/main/lib/MaskedInput";
import TextArea from "antd/lib/input/TextArea";
import Select from "antd/lib/select";
import React, {useEffect, useState} from "react";
import {searchById, findById} from "../../../patients/patientService"
import {Patient} from "../../../patients/patientModels";
import {PatientReferenceInformation} from "../../../referenceForm/referenceFormModels";

export default function PatientReferenceAgent(props: any) {

    const defaultPatient = props.referenceState.selectedPatient;

    const {Option} = Select;
    const {current, changeCurrent} = props;
    const [fetching, setFetching] = useState(true);
    const [patients, setPatients] = useState(defaultPatient == null ? [] as Patient[] : [defaultPatient] as Patient[]);
    const [patient, setPatient] = useState(defaultPatient == null ? {} as Patient : defaultPatient);
    const [hiddenPatientInfo, setHiddenPatientInfo] = useState(defaultPatient == null);
    const [idPatient, setIdPatient] = useState("");
    const [namePatient, setNamePatient] = useState("");
    const {referenceId, setReferenceId} = props;
    const [form] = Form.useForm();
    const {
        patientId,
        relationship,
        address,
        companion,
        phone,

    } = props.referenceState;

    const fetchPatient = async (value: string) => {

        setFetching(true);
        const patients = await searchById(value);
        setPatients(patients);
        setFetching(false);
    };

    useEffect(() => {
        (async () => {
            if (patientId) {
                await fetchPatient(patientId);
            }
        })();
    }, []);

    const handleChange = async (value: any) => {
        const foundPatient = patients.find(p => p.id === value);
        setPatient(foundPatient);
        props.setReference({...props.referenceState, patientId: value, selectedPatient: foundPatient});

        const patientTemp = foundPatient;
        if (patientTemp !== undefined) {
            setIdPatient(patientTemp.idNumber);
            setNamePatient(patientTemp.name);
            setHiddenPatientInfo(false);
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
            md: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
            md: {span: 8},
        },
    };

    if (defaultPatient) {

        const {
            relationship,
            address,
            companion,
            phone,
            lastName
        } = props.referenceState;
        form.setFieldsValue({
            relationShip: relationship,
            address,
            name: companion,
            phoneNumber: phone,
            lastName,
            patient: patient.id
        });

        // setIdPatient(patient.idNumber);
        // setNamePatient(patient.name);
        // setHiddenPatientInfo(false);

    }

    const onFinish = (values: any) => {
        props.setReference({
            ...props.referenceState,
            companion: values.name,
            lastName: values.lastName,
            phone: values.phoneNumber,
            address: values.address,
            relationship: values.relationShip,
            patientId: patient.id,
            selectedPatient: patient
        });
        changeCurrent(current + 1);
        setHiddenPatientInfo(true);
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
            >
                <Divider orientation="left">Paciente</Divider>
                <Form.Item label="Número de identidad" name="patient"

                           rules={[
                               {
                                   required: true,
                                   message: "Paciente es un campo requerido",
                               },
                           ]}>
                    <Select
                        showSearch
                        placeholder="Ingrese número identidad de paciente"
                        notFoundContent={fetching ? <Spin size="small"/> : null}
                        filterOption={false}
                        onSearch={fetchPatient}
                        onChange={handleChange}
                        style={{width: "100%"}}
                    >
                        {patients.map((d) => (
                            <Option
                                key={d.id}
                                value={d.id}
                            >{`${d.name} ${d.firstLastName} ${d.secondLastName}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="patientInfo"
                    label="Información del Paciente"
                    hidden={hiddenPatientInfo}
                >
                    <Input
                        placeholder="Número de identidad"
                        value={patient.idNumber}
                        disabled
                        style={{marginBottom: "20px"}}/>
                    <Input
                        placeholder="Nombre"
                        value={patient.name}
                        disabled/>


                </Form.Item>

            </Form>
        </>
    );
}
