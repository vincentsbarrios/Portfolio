import React, {useEffect, useState} from "react";
import {Input, Button, Popconfirm, Table, Space, message, Spin} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Link, navigate, RouteComponentProps} from "@reach/router";
import {ColumnType} from "antd/lib/table/interface";

import {Patient} from "./patientModels";
import MainTitle from "../../components/MainTitle";
import {all, remove} from "./patientService";

interface PatientProps extends RouteComponentProps {
}

function PatientTable(props: PatientProps) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [filterTable, setFilterTable] = useState<Patient[]>([]);
    const [currentPatients, setCurrentPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await all();
            setPatients(data);
            setLoading(false);
            setCurrentPatients(data);
        })();
    }, []);

    const onEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id;
        await navigate(`/patients/edit/${id}`);
    };

    const onDelete = async (id: number) => {
        try {
            await remove(id);
            message.info("El paciente ha sido borrado.");
            setPatients(
                patients.filter((currentPatients) => currentPatients.id !== id)
            );
            setCurrentPatients(
                patients.filter((currentPatients) => currentPatients.id !== id)
            );
        } catch (error) {
            message.error("Ocurrió un error al borrar el paciente. ");
        }
    };

    const onSearch = (value: string) => {
        setPatients(currentPatients);
        let filterWords = value.split(" ");
        let filteredTable = patients
        let multipleSearch = currentPatients
        for (let word of filterWords) {
            filteredTable = multipleSearch.filter((o) =>
                Object.values(o).some((v) =>
                    String(v).toLowerCase().includes(word.toLowerCase())
                )
            )
            if (filteredTable.length === 0) {
                break
            }
            multipleSearch = filteredTable
        }

        if (filteredTable.length === 0 && value !== "") {
            setPatients([]);
            setFilterTable([]);
        } else if (value === "") {
            setFilterTable([]);
        } else {
            setFilterTable(filteredTable);
        }
    };

    const columns: ColumnType<Patient>[] = [
        {
            title: "Número de Identidad",
            dataIndex: "idNumber",
            key: "idNumber",
            width: 150,
            sorter: (a: any, b: any) => a.idNumber - b.idNumber,
        },
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: "Primer Apellido",
            dataIndex: "firstLastName",
            key: "lastName",
            sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: "Segundo Apellido",
            dataIndex: "secondLastName",
            key: "secondLastName",
            sorter: (a: any, b: any) =>
                a.secondLastName.localeCompare(b.secondLastName),
        },
        {
            title: "Fecha de Nacimiento",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render(text: string, record: Patient) {
                return (
                    <div>
                        {`${record.dateOfBirth.getDate().toString().padStart(2, "0")}-${(
                            record.dateOfBirth.getMonth() + 1
                        )
                            .toString()
                            .padStart(2, "0")}-${record.dateOfBirth.getFullYear()}`}
                    </div>
                );
            },
        },
        {
            title: "Correo electrónico",
            dataIndex: "email",
            key: "email",
            width: 200,
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
        },
        {
            title: "Género",
            dataIndex: "gender",
            key: "gender",
            sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            fixed: "right",
            render: (text: string, record: Patient) => (
                <div>
                    <Space size={0}>
                        {" "}
                        <Button
                            onClick={onEdit}
                            data-id={record.id}
                            type="primary"
                            icon={<EditOutlined/>}
                            style={{height: "40px", width: "40px", marginLeft: "2px"}}
                        />
                        <Popconfirm
                            placement="top"
                            title="¿Está seguro que sea eliminar el registro?"
                            onConfirm={() => onDelete(record.id)}
                            okText="Sí"
                            cancelText="No"
                        >
                            <Button
                                data-id={record.id}
                                type="primary"
                                danger
                                icon={<DeleteOutlined/>}
                                style={{height: "40px", width: "40px", marginLeft: "2px"}}
                            />
                        </Popconfirm>
                    </Space>
                </div>
            ),
        },
    ];

    return (
        <div>
            <MainTitle>Pacientes</MainTitle>
            <Link to="/patients/add">
                <Button type="primary" style={{marginBottom: "20px"}}>
                    Agregar
                </Button>
            </Link>
            <Spin spinning={loading}>
                <Input.Search
                    style={{marginLeft: "35%", width: "30%", marginBottom: '1%'}}
                    placeholder="Buscar"
                    enterButton
                    onSearch={onSearch}
                />
                <Table
                    pagination={{defaultPageSize: 10}}
                    dataSource={!filterTable.length ? patients : filterTable}
                    columns={columns}
                    rowKey="idNumber"
                    locale={{emptyText: "Sin información"}}
                    scroll={{x: 1300}}
                />
            </Spin>
        </div>
    );
}

export default PatientTable;
