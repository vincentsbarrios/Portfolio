import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Space,
  Tag,
  Tooltip,
} from "antd";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create, rupsCodeExists } from "../hospitalService";
import departmentsLocations from "../../../departmentsLocations";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import { MaskedInput } from "antd-mask-input";
import { all } from "../../networks/networkService";
import { Network } from "../../networks/networkModels";

export interface AddHospitalProps extends RouteComponentProps { }

export interface HospitalForm {
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
const validateCode = async (rule: RuleObject, value: StoreValue) => {
  const code = parseInt(value, 10);
  const exists = await rupsCodeExists(code);

  if (exists) {
    throw new Error(`Ya existe un centro de salud con el código ${code}`);
  }
};

interface ServiceTagsState {
  tags: string[];
  inputVisible: boolean;
  inputValue: string;
  editInputIndex: number;
  editInputValue: string;
}

function AddHospitalForm(props: AddHospitalProps) {
  const [form] = Form.useForm();
  const [department, setDepartment] = useState(
    departmentsLocations.departments[0]
  );

  const [tagsInformation, setTagsInformation] = useState({
    tags: [] as string[],
  } as ServiceTagsState);
  const [editing, setEditing] = useState(true);

  const input = useRef<Input>(null);
  const editInput = useRef<Input>(null);

  const handleClose = (removedTag: string) => {
    const tags = tagsInformation.tags.filter((tag) => tag !== removedTag);

    setTagsInformation({ ...tagsInformation, tags });
  };

  const [phoneNumbers, setPhoneNumbers] = useState({
    num: [] as string[],
  } as PhoneNumbersState);

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

      if (exists !== -1) {
        throw new Error(`No se permiten números de Teléfonos duplicados`);
      }
    }
  };

  const deletePhoneNumber = (arrayIndex: number) => {
    let { num } = phoneNumbers;
    setPhoneNumbers({ ...phoneNumbers, num: num.splice(arrayIndex, 0) });
  };
  useEffect(() => {
    if (editInput.current) {
      editInput.current?.focus();
    } else {
      input.current?.focus();
    }
  }, [tagsInformation]);

  const showInput = () => {
    setTagsInformation({
      ...tagsInformation,
      inputVisible: true,
      inputValue: "",
    });
  };

  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    (async () => {
      const data = await all();
      setNetworks(data);
    })();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInformation({ ...tagsInformation, inputValue: event.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = tagsInformation;
    let { tags } = tagsInformation;
    var regex = /^([a-zA-Z]\s?)+$/g;
    if (regex.test(inputValue)) {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }

      setTagsInformation({
        ...tagsInformation,
        tags,
        inputValue: "",
        inputVisible: false,
      });
    } else {
      setTagsInformation({
        ...tagsInformation,
        inputValue: "",
        inputVisible: false,
      });
    }
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTagsInformation({
      ...tagsInformation,
      editInputValue: event.target.value,
    });
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tagsInformation.tags];
    const { editInputIndex, editInputValue } = tagsInformation;
    newTags[editInputIndex] = editInputValue;
    var regex = /^([a-zA-Z]\s?)+$/g;
    if (regex.test(editInputValue)) {
      var prueba = tagsInformation.tags;
      if (prueba.includes(editInputValue) === false) {
        setTagsInformation({
          ...tagsInformation,
          tags: newTags,
          editInputIndex: -1,
          editInputValue: "",
        });
      } else {
        setTagsInformation({
          ...tagsInformation,
          editInputIndex: -1,
          editInputValue: "",
        });
      }
    }
  };

  const onFinish = (values: HospitalForm) => {
    (async () => {
      console.log(values);
      try {
        debugger;
        await create({
          code: parseInt(values.code),
          name: values.name,
          address: values.address,
          department:
            departmentsLocations.departments[parseInt(values.department) - 1]
              .name,
          city:
            departmentsLocations.departments[parseInt(values.department) - 1]
              .cities[parseInt(values.city) - 1].name,
          category: values.category,
          contacts: JSON.stringify(values.contacts),
          services: JSON.stringify(tagsInformation.tags),
          networkId: parseInt(values.networkId),
        });
        form.resetFields();
        message.success("El hospital ha sido creado existosamente.");
        setTagsInformation({ tags: [] as string[] } as ServiceTagsState);
        setPhoneNumbers({ num: [] as string[] } as PhoneNumbersState);
      } catch (error) {
        message.error("Ocurrió un error al guardar el hospital.");
      }
      setEditing(true);
    })();
  };

  const { TextArea } = Input;
  const { Option } = Select;
  const {
    tags,
    inputVisible,
    inputValue,
    editInputIndex,
    editInputValue,
  } = tagsInformation;

  return (
    <>
      <Link to="/hospitals">
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: "-20" }}
        />
      </Link>
      <MainTitle>Registrar Establecimiento de Salud</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        id="form-register"
      >
        <Form.Item
          name="code"
          label="Código"
          rules={[
            {
              required: true,
              message: "Código es un campo requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
            {
              validator: validateCode,
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
          name="department"
          label="Departamento"
          rules={[
            {
              required: true,
              message: "Departamento es un campo requerido",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecciona un Departamento."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onSelect={(value) => {
              const selectedDepartment =
                departmentsLocations.departments.find((d) => d.id === value) ||
                departmentsLocations.departments[0];

              setDepartment(selectedDepartment);

              form.resetFields(["city"]);
            }}
          >
            {departmentsLocations.departments.map(
              (l: any) => (
                <Option key={l.name} value={l.id} label={l.name}>
                  {l.name}
                </Option>
              )
              // form.resetFields(["city"])
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="city"
          label="Municipio"
          rules={[
            {
              required: true,
              message: "Municipio es un campo requerido",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecciona un municipio."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {department.cities.map((l: any) => (
              <Option key={l.name} value={l.id}>
                {l.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="category"
          label="Categorización"
          rules={[
            {
              required: true,
              message: "Categorización es un campo requerido",
            },
          ]}
        >
          <Select>
            <Option value="UAPS">UAPS</Option>
            <Option value="CIS">CIS</Option>
            <Option value="POLICLINICO">POLICLINICO</Option>
            <Option value="HOSPITAL BÁSICO">HOSPITAL BÁSICO</Option>
            <Option value="HOSPITAL GENERAL">HOSPITAL GENERAL</Option>
            <Option value="HOSPITAL DE ESPECIALIDADES">
              HOSPITAL DE ESPECIALIDADES
            </Option>
            <Option value="HOSPITAL INSTITUTO">HOSPITAL INSTITUTO</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="networkId"
          label="Red"
          rules={[
            {
              required: true,
              message: "Red es un campo requerido",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecciona una Red."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {networks.map((l: any) => (
              <Option key={l.name} value={l.id} label={l.name}>
                {l.name}
              </Option>
            ))}
          </Select>
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
        <Form.Item name="contactList" label="Contactos">
          <Form.List name="contacts">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ width: "110%" }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "contactName"]}
                        fieldKey={[field.fieldKey, "contactName"]}
                        rules={[
                          {
                            required: true,
                            message: "Nombre es requerido.",
                          },
                          {
                            pattern: /^.{2,30}$/g,
                            message:
                              "Nombre debe tener mínimo 2 letras y máximo 30.",
                          },
                          {
                            pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.])+\s?)+$/g,
                            message: "Sólo se permiten letras.",
                          },
                        ]}
                      >
                        <Input placeholder="Nombre" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "contactNumber"]}
                        fieldKey={[field.fieldKey, "contactNumber"]}
                        rules={[
                          {
                            required: true,
                            message: "Número es requerido",
                          },
                          {
                            pattern: /-\d{4}/g,
                            message: "Número de teléfono incompleto. ",
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
                      }}
                      block
                    >
                      <PlusOutlined /> Agregar Contacto
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>
        <Form.Item label="Servicios">
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Form.Item
                  name="tag"
                  rules={[
                    {
                      required: true,
                      // type : "regexp",
                      pattern: /^([a-zA-Z]\s?)+$/g,
                      message: "Solo se permiten letras",
                    },
                  ]}
                >
                  <Input
                    ref={editInput}
                    key={tag}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                    maxLength={30}
                  // required
                  />
                </Form.Item>
              );
            }

            const isLongTag = tag.length > 30;

            const tagElem = (
              <Tag
                className="edit-tag"
                key={tag}
                closable={true}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    // debugger;
                    setTagsInformation({
                      ...tagsInformation,
                      editInputIndex: index,
                      editInputValue: tag,
                      inputVisible: false,
                      // inputValue: "",
                    });
                    editInput.current?.focus();
                    form.resetFields(["tag"]);
                    e.preventDefault();
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 30)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip
                title={tag}
                key={tag}
                style={{ display: "inline-block" }}
              >
                {tagElem}
              </Tooltip>
            ) : (
                tagElem
              );
          })}
          {inputVisible && (
            <Form.Item
              name="tag"
              rules={[
                {
                  required: true,
                  // type : "regexp",
                  pattern: /^([a-zA-Z]\s?)+$/g,
                  message: "Solo se permiten letras",
                },
              ]}
            >
              <Input
                ref={input}
                type="text"
                size="small"
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
                maxLength={30}
              />
            </Form.Item>
          )}
          {!inputVisible && (
            <Tag
              className="site-tag-plus"
              onClick={() => {
                showInput();
                form.resetFields(["tag"]);
              }}
            >
              <PlusOutlined />
              Nuevo Servicio
            </Tag>
          )}
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
          <Button
            htmlType="button"
            onClick={() => {
              setTagsInformation({ tags: [] as string[] } as ServiceTagsState);
              form.resetFields();
            }}
          >
            Reiniciar campos
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default AddHospitalForm;
