import {Button, Form, Select} from "antd";
import {Hospital} from '../../../hospitals/hospitalModels';
import React, {useEffect, useState} from "react";
import {all} from "../../../hospitals/hospitalService";
import { findById } from "../../../hospitals/hospitalService";
import { findById2 } from "../../referenceCommunityAgentHealthPromoterService";

export interface SearchForm {
    [key: string]: string;
}

function HospitalSearchingEdit(props: any) {
    const {Option} = Select;
    const [form] = Form.useForm();
    const [hidden, setHidden] = useState(true);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [selectedOrigin, setSelectedOrigin] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(0);
    const [selectedInstitution, setSelectedInstitution] = useState("");
    const {current, changeCurrent} = props;

    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")

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


    useEffect(() => {
        (async () => {
            const data = await all();
            setHospitals(data);
            
            const hospitalEdit = await findById2(props.passId ?? 1);
            const oriHospital = await findById(hospitalEdit.originHfId ?? 1);
            const destHospital = await findById(hospitalEdit.destinationHfId ?? 1);

            form.setFieldsValue(
                {
                    origin: oriHospital.name,
                    destination: destHospital.name
                })
       
        })();
    }, []);

    const prev = () => {
        let value = current - 1;
        changeCurrent(value);
    };

    const onFinished = () => {
        changeCurrent(current + 1);
    }

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

    return (
        <>
            <Form
                onFinish={onFinished}
                {...formItemLayout}
                form={form}
                name="register"
                scrollToFirstError
                id="HospitalDestination"
            >
                <Form.Item
                    label="Establecimiento de Salud que remite"
                    name="origin"
                    rules={[{
                        required: true,
                        message: "El campo es requerido."
                    }]}
                >
                    <Select
                        showSearch
                        placeholder="Seleccione una institución"
                        onSelect={(value) => {
                            props.onOrigin(+value);
                            setSelectedOrigin(+value);
                            console.log(+value)
                        }}
                    >
                        {hospitals.map(
                            (h: any) => (
                                <Option key={h.name} value={h.id} label={h.name}>
                                    {h.name}
                                </Option>
                            )
                        )}
                    </Select>

                </Form.Item>

                <Form.Item
                    label="Establecimiento de salud al que sera remitido"
                    name="destination"
                    rules={[{
                        required: true,
                        message: "El campo es requerido."
                    }]}
                >
                    <Select
                        showSearch
                        placeholder="Seleccione un establecimiento de salud"
                        onSelect={(value) => {
                            props.onDestination(+value);
                            setSelectedDestination(+value);
                            console.log(+value)
                        }}
                    >
                        {hospitals.map(
                            (h: any) => (
                                <Option key={h.name} value={h.id} label={h.name}>
                                    {h.name}
                                </Option>
                            )
                        )}
                    </Select>

                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{marginRight: "8px"}}
                    >
                        Siguiente
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

export default HospitalSearchingEdit;