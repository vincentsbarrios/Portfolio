import React, { useState, Props, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Divider,
    DatePicker,
} from "antd";
import moment from "moment";
import { create, update } from "../../referenceFormService";
import { findById2 } from "../../referenceFormService";
import {navigate} from "@reach/router";

export interface ReferenceForm {
    [key: string]: string;
}

function ReferenceInformationEdit(props: any) {
    const { current, length, changeCurrent } = props;

    const [form] = Form.useForm();
    const [madeBycurrent, setMadeByCurrent] = useState(false);
    const [attentionCurrent, setAttentionCurrent] = useState(false);

    const handleSelectReferenceAnswer = (value: string) => {
        if (value.toLowerCase() == "otros") setMadeByCurrent(true);
        else setMadeByCurrent(false);
    };

    const handleSelectAttentionAnswer = (values: string) => {
        if (values.toLowerCase() == "otros") setAttentionCurrent(true);
        else setAttentionCurrent(false);
    };

    const prev = () => {
        let value = current - 1;
        changeCurrent(value);
    };


    useEffect(() => {
        (async () => {

            const referenceEdit = await findById2(props.passId ?? 1);

            var vitals = JSON.parse(referenceEdit.vitalSigns)
            var oby = JSON.parse(referenceEdit.obGyn)
            var physical = JSON.parse(referenceEdit.physicalExamination)
            var aa = oby.fum

            var madeByValue: string;
            if (referenceEdit.risk == true) {
                madeByValue = "Sin Riesgo";
            } else {
                madeByValue = "Con Riesgo";
            }

            var contactValue: string;
            if (referenceEdit.contactedHf == true) {
                contactValue = "Si";
            } else {
                contactValue = "No";
            }

            console.log(aa)
            form.setFieldsValue(
                {
                    motive: referenceEdit.motive,
                    symptoms: referenceEdit.symptoms,
                    descriptionMotive: referenceEdit.descriptionMotive,
                    medicalSummary: referenceEdit.medicalSummary,
                    bloodPressure: vitals.bloodPressure,
                    heartRate: vitals.heartRate,
                    pulse: vitals.pulse,
                    respiratoryRate: vitals.respiratoryRate,
                    sizePerson: vitals.sizePerson,
                    temperature: vitals.temperature,
                    weight: vitals.weight,
                    birth: oby.birth,
                    cesareanSections: oby.cesareanSections,
                    deadChildren: oby.deadChildren,
                    deaths: oby.deaths,
                    livingChildren: oby.livingChildren,
                    pregnancy: oby.pregnancy,
                    abortions: oby.abortions,
                    abdomen: physical.abdomen,
                    extremities: physical.extremities,
                    eyes: physical.eyes,
                    genitals: physical.genitals,
                    head: physical.head,
                    neck: physical.neck,
                    neurological: physical.neurological,
                    orl: physical.orl,
                    torax: physical.torax,
                    complementaryExams: referenceEdit.complementaryExams,
                    risk: madeByValue,
                    diagnosticImpression: referenceEdit.diagnosticImpression,
                    observations: referenceEdit.observations,
                    madeBy: referenceEdit.madeBy,
                    attentionRequired: referenceEdit.attentionRequired,
                    contactedHf: contactValue,
                    contactId: referenceEdit.contactId,
                    date: moment(referenceEdit.date)
                })
        })();
    }, []);

    const onFinish = (values: ReferenceForm) => {
        const vitalSignsFormJson = {
            bloodPressure: values.bloodPressure,
            respiratoryRate: values.respiratoryRate,
            pulse: values.pulse,
            heartRate: values.heartRate,
            temperature: values.temperature,
            weight: values.weight,
            sizePerson: values.sizePerson,
        };

        const obgynFormJson = {
            fum: values.fum,
            fpp: values.fpp,
            pregnancy: values.pregnancy,
            birth: values.birth,
            cesareanSections: values.cesareanSections,
            livingChildren: values.livingChildren,
            deadChildren: values.deadChildren,
            deaths: values.deaths,
            abortions: values.abortions,
        };

        const physicalExamination = {
            head: values.head,
            orl: values.orl,
            eyes: values.eyes,
            neck: values.neck,
            torax: values.torax,
            abdomen: values.abdomen,
            genitals: values.genitals,
            extremities: values.extremities,
            neurological: values.neurological,
        };

        //Decide whether to get the value from the select or from the input other
        var madeByValue: string;
        if (madeBycurrent == true) {
            madeByValue = values.othersMadeBy;
        } else {
            madeByValue = values.madeBy;
        }

        var attentionValue: string;
        if (attentionCurrent == true) {
            attentionValue = values.othersAttention;
        } else {
            attentionValue = values.attentionRequired;
        }


        (async () => {
            const referenceEdit = await findById2(props.passId ?? 1);
            var TempInstitution: string;
            if (props.referenceState.institution === undefined) {
                TempInstitution = referenceEdit.institution;
                console.log("Enter If", TempInstitution);
            }
            else{
                TempInstitution = props.referenceState.institution;
                console.log("Enter Else", TempInstitution);
            }
            var TempPatient: number;
            if(props.referenceState.patientId === undefined){
                TempPatient = referenceEdit.patientId;
            }
            else{
                TempPatient = props.referenceState.patientId
                
            }
            console.log(TempPatient)
            try {
                await update({
                    id: parseInt(props.passId),
                    type: "normal",
                    originHfId: props.referenceState.originHfId,
                    destinationHfId: props.referenceState.destinationHfId,
                    institution: TempInstitution,
                    patientId: TempPatient,
                    motive: values.motive,
                    descriptionMotive: values.descriptionMotive,
                    symptoms: values.symptoms,
                    medicalSummary: values.medicalSummary,
                    vitalSigns: JSON.stringify(vitalSignsFormJson),
                    obGyn: JSON.stringify(obgynFormJson),
                    physicalExamination: JSON.stringify(physicalExamination),
                    complementaryExams: values.complementaryExams,
                    diagnosticImpression: values.diagnosticImpression,
                    observations: values.observations,
                    risk: Boolean(values.risk),
                    attentionRequired: attentionValue,
                    madeBy: madeByValue,
                    contactedHf: Boolean(values.contactedHf),
                    contactId: values.contactId,
                    date: new Date(values.date),
                    address: props.referenceState.address,
                    companion: props.referenceState.companion,
                    phone: props.referenceState.phone,
                    relationship: props.referenceState.relationship,
                });

                form.resetFields();
								navigate('/referenceForm');
                message.success("Elementos se han guardado exitosamente.");
            } catch (error) {
                console.log(error);
                message.error("Ocurrió un error al guardar los elementos.");
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
                    label="Motivo"
                    name="motive"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="Diagnostico">Diagnostico</Select.Option>
                        <Select.Option value="Tratamiento">Tratamiento</Select.Option>
                        <Select.Option value="Seguimiento">Seguimiento</Select.Option>
                        <Select.Option value="Rehabilitación">Rehabilitación</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="symptoms"
                    label="Signos y sintomas principales"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.¡!¿?)()+-/"'])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="descriptionMotive"
                    label="Descripción del motivo"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.¡!¿?)()+-/"'])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="medicalSummary"
                    label="Resumen de datos clinicos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.¡!¿?)()+-/"'])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Divider orientation="left">Signos vitales</Divider>

                <Form.Item
                    name="bloodPressure"
                    label="Presión arterial"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^[0-9/]+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="respiratoryRate"
                    label="Frecuencia respiratoria"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="pulse"
                    label="Pulso"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="heartRate"
                    label="Frecuencia cardiaca"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="temperature"
                    label="Temperatura"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="weight"
                    label="Peso"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="sizePerson"
                    label="Talla"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {
                    props.referenceState.selectedPatient.gender !== 'Masculino' && (<div>

                <Divider orientation="left">Datos Gineco Obstétricos</Divider>

                <Form.Item
                    label="FUM"
                    name="fum"
                    rules={[
                        {
                            required: true,
                            message: "FUM es un campo requerido",
                        },
                    ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format={"DD-MM-YYYY"}
                        placeholder="Ingrese fecha"
                        disabledDate={(d) =>
                            !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="FPP"
                    name="fpp"
                    rules={[
                        {
                            required: true,
                            message: "FPP es un campo requerido",
                        },
                    ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format={"DD-MM-YYYY"}
                        placeholder="Ingrese fecha"
                        disabledDate={(d) => !d || d.isSameOrBefore("1940-01-01")}
                    />
                </Form.Item>

                <Form.Item
                    name="pregnancy"
                    label="Embarazos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="birth"
                    label="Partos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="cesareanSections"
                    label="Cesareas"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="livingChildren"
                    label="Hijos vivos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="deadChildren"
                    label="Hijos Muertos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="deaths"
                    label="Obitos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="abortions"
                    label="Abortos"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                    </div>)}

                <Divider orientation="left">Examen físico</Divider>

                <Form.Item
                    name="head"
                    label="Cabeza"
                    rules={[
                        {
                            pattern: /^.{2,60}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 60.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="orl"
                    label="ORL"
                    rules={[
                        {
                            pattern: /^.{2,60}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 60.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="eyes"
                    label="Ojos"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="neck"
                    label="Cuello"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="torax"
                    label="Tórax"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="abdomen"
                    label="Abdomen"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="genitals"
                    label="Genitales"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="extremities"
                    label="Extremidades"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="neurological"
                    label="Neurológico"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "El campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="complementaryExams"
                    label="Resultados de exámenes complementarios"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.¡!¿?)()+-/])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Evaluación de Riesgo"
                    name="risk"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="False">Sin Riesgo</Select.Option>
                        <Select.Option value="True">Con Riesgo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="diagnosticImpression"
                    label="Impresión Diagnostica"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.¡!¿?)()+-/"'])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="observations"
                    label="Recomendaciones/Observaciones"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                            whitespace: true,
                        },
                        {
                            pattern: /^.{2,150}$/g,
                            message: "El campo debe tener mínimo 2 letras y máximo 150.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.¡!¿?)()+-/"'])+\s?)+$/g,
                            message: "No se permiten simbolos.",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Referencia Respuesta elaborada por"
                    name="madeBy"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                        },
                    ]}
                >
                    <Select onChange={handleSelectReferenceAnswer}>
                        <Select.Option value="Medico General">Medico General</Select.Option>
                        <Select.Option value="Medico Especialista">
                            Medico Especialista
            </Select.Option>
                        <Select.Option value="Auxiliar Enfermeria">
                            Auxiliar Enfermeria
            </Select.Option>
                        <Select.Option value="Otros">Otros</Select.Option>
                    </Select>
                </Form.Item>

                {madeBycurrent === true ? (
                    <Form.Item
                        name="othersMadeBy"
                        label="Especificación"
                        rules={[
                            {
                                required: true,
                                message: "El campo es requerido",
                                whitespace: true,
                            },
                            {
                                pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9])+\s?)+$/g,
                                message: "Sólo se permiten números y letras.",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : null}

                <Form.Item
                    label="Amerita atencion en"
                    name="attentionRequired"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                        },
                    ]}
                >
                    <Select onChange={handleSelectAttentionAnswer}>
                        <Select.Option value="Consulta Externa">
                            Consulta Externa
            </Select.Option>
                        <Select.Option value="Emergencia">Emergencia</Select.Option>
                        <Select.Option value="Hospitalizacion">
                            Hospitalizacion
            </Select.Option>
                        <Select.Option value="Otros">Otros</Select.Option>
                    </Select>
                </Form.Item>

                {attentionCurrent === true ? (
                    <Form.Item
                        name="othersAttention"
                        label="Especifique"
                        rules={[
                            {
                                required: true,
                                message: "El campo es requerido",
                                whitespace: true,
                            },
                            {
                                pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9])+\s?)+$/g,
                                message: "Sólo se permiten números y letras.",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : null}

                <Form.Item
                    label="Se contacto al Establecimiento de Salud"
                    name="contactedHf"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido.",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="False">No</Select.Option>
                        <Select.Option value="True">Si</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="contactId"
                    label="Cita al servicio de"
                    rules={[
                        {
                            required: true,
                            message: "El campo es requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^(\d)+$/g,
                            message: "Sólo se permiten números.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Fecha"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Fecha es un campo requerido",
                        },
                    ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format={"DD-MM-YYYY"}
                        placeholder="Ingrese fecha"
                        disabledDate={(d) =>
                            !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
                        }
                    />
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

export default ReferenceInformationEdit;
