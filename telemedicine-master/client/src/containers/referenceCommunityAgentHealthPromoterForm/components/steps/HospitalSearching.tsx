import {Form, Select} from "antd";
import {Hospital} from '../../../hospitals/hospitalModels'
import React, {useState, useEffect} from "react";
import {all} from "../../../hospitals/hospitalService";

export interface SearchForm {
    [key: string]: string;
}

function HospitalSearching(props: any) {
    const {Option} = Select;
    const [form] = Form.useForm();
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    useEffect(() => {
        (async () => {
            const data = await all();
            setHospitals(data);
            console.log(data);
        })();
    }, []);

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


    useEffect(() => {
        form.setFieldsValue({
            origin: props.referenceState.originHfId,
            destination: props.referenceState.destinationHfId,
        });
    },[]);

    return (
        <>
            <Form
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
                        placeholder="Seleccione un establecimiento de salud"
                        onSelect={(value: any) => {
                            props.onOrigin(value);
                            console.log(value)
                            form.resetFields(['destination']);
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
                        onSelect={(value: any) => {
                            props.onDestination(value);
                            console.log(+value)
                        }}
                    >
                        {hospitals.filter(h => h.id !== props.referenceState.originHfId).map(
                            (h: any) => (
                                <Option key={h.name} value={h.id} label={h.name}>
                                    {h.name}
                                </Option>
                            )
                        )}
                    </Select>

                </Form.Item>
            </Form>


        </>

    );

}

export default HospitalSearching;
