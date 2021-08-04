import React, {useState, Props, useEffect} from "react";
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
import {create} from "../../referenceFormService";
import {navigate} from "@reach/router";
import {RRForm} from "../../referenceFormModels";

export interface ReferenceForm {
    [key: string]: string;
}

function ReferenceInformation(props: any) {
    const {current, length, changeCurrent, referenceState, setReference} = props;

    const [form] = Form.useForm();
    const [madeBycurrent, setMadeByCurrent] = useState(false);
    const [attentionCurrent, setAttentionCurrent] = useState(false);

    const handleSelectReferenceAnswer = (value: string) => {
        if (value.toLowerCase() == "otros") setMadeByCurrent(true);
        else setMadeByCurrent(false);

        const physicalExamination = {...referenceState.physicalExamination};
        physicalExamination.madeBy = value;
        setReference({...referenceState, physicalExamination} as RRForm);
    };

    useEffect(()=> {
        if(referenceState.motive){
            form.setFieldsValue({
                ...referenceState,
                ...referenceState.vitalSigns,
                ...referenceState.obGyn,
                ...referenceState.physicalExamination,
            });
        }
    })

    const handleSelectAttentionAnswer = (values: string) => {
        if (values.toLowerCase() == "otros") setAttentionCurrent(true);
        else setAttentionCurrent(false);

        const physicalExamination = {...referenceState.physicalExamination};
        physicalExamination.attentionRequired = values;
        setReference({...referenceState, physicalExamination} as RRForm);
    }

    const prev = () => {
        let value = current - 1;
        changeCurrent(value);
    };


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

        const physicalExaminationFormJson = {
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
            try {
                await create({
                    type: "normal",
                    originHfId: props.referenceState.originHfId,
                    destinationHfId: props.referenceState.destinationHfId,
                    institution: props.referenceState.institution,
                    patientId: props.referenceState.patientId,
                    motive: values.motive,
                    descriptionMotive: values.descriptionMotive,
                    symptoms: values.symptoms,
                    medicalSummary: values.medicalSummary,
                    vitalSigns: JSON.stringify(vitalSignsFormJson),
                    obGyn: JSON.stringify(obgynFormJson),
                    physicalExamination: JSON.stringify(physicalExaminationFormJson),
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
                    relationship: props.referenceState.relationship
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
                    <Select onSelect={(value) => {
                        setReference({...referenceState, motive: value} as RRForm)
                    }}>
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
                    <Input.TextArea
                        onChange={event => setReference({
                            ...referenceState,
                            symptoms: event.target.value
                        } as RRForm)}/>
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
                    <Input.TextArea onChange={(event) => {


                        setReference({...referenceState, descriptionMotive: event.target.value} as RRForm)
                    }}/>
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
                    <Input.TextArea onChange={(event) => setReference({
                        ...referenceState,
                        medicalSummary: event.target.value
                    } as RRForm)}/>
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
                    <Input onChange={event => {

                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.bloodPressure = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm)
                    }}/>
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
                    <Input onChange={event => {
                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.respiratoryRate = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.pulse = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.heartRate = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.temperature = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.weight = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const vitalSigns = {...referenceState.vitalSigns};
                        vitalSigns.sizePerson = event.target.value;
                        setReference({...referenceState, vitalSigns} as RRForm);
                    }}/>
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
                                style={{width: "100%"}}
                                format={"DD-MM-YYYY"}
                                placeholder="Ingrese fecha"
                                onChange={value => {

                                    const obGyn = {...referenceState.obGyn};
                                    obGyn.fum = value;
                                    setReference({...referenceState, obGyn} as RRForm);
                                }}
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
                                style={{width: "100%"}}
                                format={"DD-MM-YYYY"}
                                placeholder="Ingrese fecha"
                                disabledDate={(d) => !d || d.isSameOrBefore("1940-01-01")}
                                onChange={value => {
                                    const obGyn = {...referenceState.obGyn};
                                    obGyn.fpp = value;
                                    setReference({...referenceState, obGyn} as RRForm);
                                }}
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.pregnancy = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.birth = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.cesareanSections = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.livingChildren = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.deadChildren = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.deaths = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                            <Input onChange={event => {
                                const obGyn = {...referenceState.obGyn};
                                obGyn.abortions = event.target.value;
                                setReference({...referenceState, obGyn} as RRForm);
                            }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.head = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.orl = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.eyes = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.neck = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.torax = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.abdomen = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.genitals = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.extremities = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.neurological = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input.TextArea onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.complementaryExams = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Select onChange={value => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.risk = value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}>
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
                    <Input.TextArea onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.diagnosticImpression = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                    <Input.TextArea onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.observations = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                        <Input onChange={event => {
                            const physicalExamination = {...referenceState.physicalExamination};
                            physicalExamination.othersMadeBy = event.target.value;
                            setReference({...referenceState, physicalExamination} as RRForm);
                        }}/>
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
                        <Input onChange={event => {
                            const physicalExamination = {...referenceState.physicalExamination};
                            physicalExamination.othersAttention = event.target.value;
                            setReference({...referenceState, physicalExamination} as RRForm);
                        }}/>
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
                    <Select onSelect={value => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.contactedHf = value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}>
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
                    <Input onChange={event => {
                        const physicalExamination = {...referenceState.physicalExamination};
                        physicalExamination.contactId = event.target.value;
                        setReference({...referenceState, physicalExamination} as RRForm);
                    }}/>
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
                        style={{width: "100%"}}
                        format={"DD-MM-YYYY"}
                        placeholder="Ingrese fecha"
                        disabledDate={(d) =>
                            !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
                        }
                        onChange={value => {
                            const physicalExamination = {...referenceState.physicalExamination};
                            physicalExamination.date = value;
                            setReference({...referenceState, physicalExamination} as RRForm);
                        }}
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{marginRight: "8px"}}
                    >
                        Guardar
                    </Button>

                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reiniciar campos
                    </Button>
                    {current > 0 && (
                        <Button style={{margin: "0 8px"}} onClick={() => prev()}>
                            Anterior
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
}

export default ReferenceInformation;
