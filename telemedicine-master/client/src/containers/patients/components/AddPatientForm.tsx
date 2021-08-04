import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    message,
    Space,
} from "antd";
import { Link, RouteComponentProps } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import {
    create,
    IdNumberExists,
    ForeignIdNumberExists,
    EmailExists,
} from "../patientService";
import {
    ArrowLeftOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import MaskedInput from "antd-mask-input";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";

export interface AddPatientProps extends RouteComponentProps { }

export interface PatientForm {
    [key: string]: string;
}

interface PhoneNumbersState {
    num: string[];
}
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

function AddPatientForm(props: AddPatientProps) {
    const [form] = Form.useForm();

    const [Hidden, setHidden] = useState(false);
    const [editing, setEditing] = useState(true);
    const [Required, setRequired] = useState(false);
    const [phoneRequired, setPhoneRequired] = useState(true);
    const [phoneNumbers, setPhoneNumbers] = useState({
        num: [] as string[],
    } as PhoneNumbersState);
    const changeHidden = () => {
        if (Hidden) {
            form.resetFields(["foreignIdNumber"]);
        } else {
            form.resetFields(["idNumber"]);
        }
        setHidden(!Hidden);
        setRequired(!Required);
    };

    const addPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { num } = phoneNumbers;
        if (event.target.value.search("_") === -1) {
            num = [...num, event.target.value];
            setPhoneNumbers({ ...phoneNumbers, num });
        }
    };

    const validatePhoneNumber = async (rule: RuleObject, value: StoreValue) => {
        if (editing) {
            const { num } = phoneNumbers;
            const phoneN = value;
            const exists = num.indexOf(phoneN);
            console.log(num)
            console.log(exists)
            if (exists !== -1) {
                throw new Error(`No se permiten números de Teléfonos duplicados`);
            }
        }
    };

    const deletePhoneNumber = (arrayIndex: number) => {
        let { num } = phoneNumbers;
        setPhoneNumbers({ ...phoneNumbers, num: num.splice(arrayIndex, 0) });
    };

    const validateIdNumber = async (rule: RuleObject, value: StoreValue) => {
        const IdNumber = value;
        const exists = await ForeignIdNumberExists(IdNumber);
        if (exists && Required === false) {
            throw new Error(
                `Ya existe un paciente con ese número de identidad. ${IdNumber}`
            );
        }
    };

    const validateForeignIdNumber = async (
        rule: RuleObject,
        value: StoreValue
    ) => {
        const ForeignIdNumber = value;
        const exists = await ForeignIdNumberExists(ForeignIdNumber);

        if (exists && Required === true) {
            throw new Error(
                `Ya existe un paciente con ese número de identidad. ${ForeignIdNumber}`
            );
        }
    };

    const validateEmail = async (rule: RuleObject, value: StoreValue) => {
        const Email = value;
        const exists = await EmailExists(Email);

        if (exists) {
            throw new Error(
                `Ya existe un paciente con ese correo electrónico. ${Email}`
            );
        }
    };

    const onFinish = (values: PatientForm) => {
        (async () => {
            var newId = values.idNumber;
            if (Hidden) {
                newId = values.foreignIdNumber;
            }
            try {
                await create({
                    idNumber: newId,
                    name: values.name,
                    firstLastName: values.firstLastName,
                    secondLastName: values.secondLastName,
                    dateOfBirth: moment(values.dateOfBirth).toDate(),
                    email: values.email,
                    gender: values.gender,
                    address: values.address,
                    contacts: JSON.stringify(values.contacts),
                    nationality: values.nationality,
                });
                form.resetFields();
                setPhoneRequired(true);
                setPhoneNumbers({ num: [] as string[] } as PhoneNumbersState);
                message.success("El paciente ha sido creado existosamente");
            } catch (error) {
                message.error("Ocurrió un error al guardar nuevo paciente");
            }
            setEditing(true);
        })();
    };

    const { TextArea } = Input;
    return (
        <>
            <Link to="/patients">
                <Button
                    type="primary"
                    shape="circle"
                    htmlType="submit"
                    icon={<ArrowLeftOutlined />}
                    style={{ marginLeft: "-20" }}
                ></Button>
            </Link>
            <MainTitle>Registrar paciente</MainTitle>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="nationality"
                    label="Nacionalidad"
                    initialValue="hondureño"
                    rules={[
                        {
                            required: true,
                            message: "Nacionalidad es un campo requerido",
                        },
                    ]}
                >
                    <Radio.Group buttonStyle="solid" onChange={changeHidden}>
                        <Radio.Button value="hondureño">Hondureño</Radio.Button>
                        <Radio.Button value="extranjero">Extranjero</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="idNumber"
                    label="Número de Identidad"
                    hidden={Hidden}
                    rules={[
                        {
                            pattern: /\d{5}/,
                            message: "Número de Identidad incompleto. ",
                        },
                        {
                            required: !Required,
                            message: "Número de Identidad es un campo requerido",
                            whitespace: true,
                        },
                        {
                            validator: validateIdNumber,
                        },
                    ]}
                >
                    <MaskedInput mask="1111-1111-11111" />
                </Form.Item>
                <Form.Item
                    name="foreignIdNumber"
                    label="Número de Identidad"
                    hidden={!Hidden}
                    rules={[
                        {
                            pattern: /^[A-Za-z0-9]+$/g,
                            message: "Sólo se aceptan números y letras.",
                        },
                        {
                            min: 8,
                            max: 20,
                            message:
                                "Número de Identidad debe tener mínimo 8 y máximo 20 caracteres.",
                        },
                        {
                            required: Required,
                            message: "Número de Identidad es un campo requerido",
                        },
                        {
                            validator: validateForeignIdNumber,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "Nombre debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
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
                    name="firstLastName"
                    label="Primer Apellido"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message: "Apellido debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Solo se permiten letras.",
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
                    name="secondLastName"
                    label="Segundo Apellido"
                    rules={[
                        {
                            pattern: /^.{2,30}$/g,
                            message:
                                "Segundo apellido debe tener mínimo 2 letras y máximo 30.",
                        },
                        {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                            message: "Solo se permiten letras.",
                        },
                        {
                            required: true,
                            message: "Segundo apellido es un campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Fecha Nacimiento"
                    name="dateOfBirth"
                    rules={[
                        {
                            required: true,
                            message: "Fecha nacimiento es un campo requerido",
                        },
                    ]}
                >
                    <DatePicker
                        defaultPickerValue={moment("15-01-1995", "DD-MM-YYYY")}
                        format={"DD-MM-YYYY"}
                        placeholder="Ingrese fecha"
                        disabledDate={(d) =>
                            !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Correo electrónico"
                    rules={[
                        {
                            required: true,
                            message: "Correo electrónico es un campo requerido",
                            whitespace: true,
                        },
                        {
                            pattern: /^([A-Za-z]+[0-9]*[-|_|.]*)+@(.)+$/g,
                            message:
                                "Correo sólo acepta letras, números, puntos o guiones. En ese orden. ",
                        },
                        {
                            type: "email",
                            message: "Correo debe estar en formato: ejemplo@ejemplo.com",
                        },
                        {
                            validator: validateEmail,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Género"
                    rules={[
                        {
                            required: true,
                            message: "Género es un campo requerido",
                            whitespace: true,
                        },
                    ]}
                >
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="Femenino">Femenino</Radio.Button>
                        <Radio.Button value="Masculino">Masculino</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Dirección"
                    rules={[
                        {
                            pattern: /^[a-zA-Z]+([^!@$%^&*()_+-/?:;'"\*{}[\]<>][a-zA-Z]*[0-9]*\s?[,.#]?\n?)*$/g,
                            message: "Sólo se permiten letras, números, puntos y comas.",
                            min: 1,
                        },
                        {
                            required: true,
                            message: "Dirección es un campo requerido",
                            whitespace: true,
                        },
                        {
                            max: 200,
                            message: "Dirección debe tener maximo 200 caracteres.",
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="phoneContacts"
                    label="Números de teléfono:"
                    rules={[
                        {
                            required: phoneRequired,
                            message: "El campo número de teléfono es requerido.",
                        },
                    ]}
                >
                    <Form.List name="contacts">
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    {fields.map((field) => (
                                        <Space key={field.key} align="start">
                                            <Form.Item
                                                {...field}
                                                rules={[
                                                    {
                                                        pattern: /-\d{4}/,
                                                        message: "Número de teléfono incompleto. ",
                                                    },
                                                    {
                                                        required: true,
                                                        message: "Ingresar número o eliminar el campo",
                                                    },
                                                    {
                                                        validator: validatePhoneNumber,
                                                    },
                                                ]}
                                            >
                                                <MaskedInput
                                                    mask="+(111) 1111-1111"
                                                    onBlur={addPhoneNumber}
                                                />
                                            </Form.Item>

                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    if (fields.length === 1) {
                                                        setPhoneRequired(true);
                                                    }
                                                    deletePhoneNumber(field.name);
                                                    remove(field.name);
                                                }}
                                            />
                                        </Space>
                                    ))}

                                    <Form.Item style={{ marginBottom: "0px" }}>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                                setPhoneRequired(false);
                                            }}
                                            block
                                        >
                                            <PlusOutlined /> Agregar número de teléfono
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: "8px" }}
                        onClick={() => {
                            setEditing(false);
                        }}
                    >
                        Guardar
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reiniciar campo
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default AddPatientForm;