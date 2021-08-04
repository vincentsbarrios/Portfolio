import React, {useEffect, useState} from "react";
import {
    ArrowLeftOutlined,
} from "@ant-design/icons";
import {Steps, Button, message} from "antd";
import ReferenceACSPSInformation from "./steps/referenceACSPSInformation";
import {Link} from "@reach/router";
import HospitalSearching from "./steps/HospitalSearching";
import {ReferenceACSPSForm} from "./../referenceCommunityAgentHealthPromoterModel";
import PatientReferenceAgent from "./steps/PatientReferenceAgent";

const {Step} = Steps;

function AddRRACSPS(props: any) {
    const [current, setCurrent] = useState(0);
    const [reference, setReference] = useState({} as ReferenceACSPSForm);

    const changeCurrent = (current: number) => {
        setCurrent(current);
    };

    const originHandler = (originHfId: number) => {
        setReference({...reference, originHfId});
    };

    const destinationHandler = (destinationHfId: number) => {
        setReference({...reference, destinationHfId});
    };

    const setPatientInfo = (patient: number) => {
        setReference({
            ...reference,
            patientId: patient,
        })
    }

    const next = () => {
        let nextVal = current + 1;
        setCurrent(nextVal);
    };

    const prev = () => {
        const prevVal = current - 1;
        setCurrent(prevVal);
    };

    const steps = [
        {
            title: "Paciente",
            content: <PatientReferenceAgent
                current={current}
                changeCurrent={changeCurrent}
                referenceState={reference}
                setReference={setReference}
                setPatientInfo={setPatientInfo}
            />,
        },
        {
            title: "Establecimiento de Salud",
            content: (
                <HospitalSearching
                    onOrigin={originHandler}
                    onDestination={destinationHandler}
                    length={3}
                    referenceState={reference}
                    setReference={setReference}
                    current={current}
                    changeCurrent={changeCurrent}
                />
            ),
        },
        {
            title: "Diagnostico",
            content: (
                <ReferenceACSPSInformation
                    length={3}
                    current={current}
                    changeCurrent={changeCurrent}
                    setReference={setReference}
                    referenceState={reference}
                />
            ),
        },
    ];

    return (
        <>
            <Link to="/referenceACSPSForm">
                <Button
                    type="primary"
                    shape="circle"
                    htmlType="submit"
                    icon={<ArrowLeftOutlined/>}
                    style={{marginBottom: "40px"}}
                />
            </Link>
            <Steps current={current} style={{marginBottom: "30px"}}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>

            <div className="steps-content">{steps[current].content}</div>
            <div style={{marginTop: "20px"}} className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Siguiente
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: "0 8px"}} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
            </div>
        </>
    );
}

export default AddRRACSPS;
