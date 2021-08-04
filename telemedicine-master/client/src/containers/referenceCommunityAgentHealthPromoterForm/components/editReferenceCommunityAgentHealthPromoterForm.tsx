import React, {useState} from "react";
import {Link} from "@reach/router";
import {
    ArrowLeftOutlined,
} from "@ant-design/icons";
import {Steps, Button, message} from "antd";
import {ReferenceACSPSForm} from "./../referenceCommunityAgentHealthPromoterModel";
import HospitalSearchingEdit
    from "../../referenceCommunityAgentHealthPromoterForm/components/steps/HospitalSearchingEdit";
import ReferenceACSPSInformationEdit from "./steps/referenceACSPSInformationEdit";
import PatientReferenceAgent from "./steps/PatientReferenceAgent";
import {Patient} from "../../patients/patientModels";

const {Step} = Steps;

function StepperEditACSPS(props: any) {
    const [current, setCurrent] = useState(0);
    const [reference, setReference] = useState({} as ReferenceACSPSForm);
    const passId = props.id;

    const changeCurrent = (current: number) => {
        setCurrent(current);
    };

    const originHandler = (originHfId: number) => {
        setReference({...reference, originHfId});
    };

    const destinationHandler = (destinationHfId: number) => {
        setReference({...reference, destinationHfId});
    };

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
            content: <PatientReferenceAgent referenceState={reference} selectedPatient={{} as Patient} editing={true}/>,
        },
        {
            title: "Establecimiento de Salud",
            content: (
                <HospitalSearchingEdit
                    onOrigin={originHandler}
                    onDestination={destinationHandler}
                    length={3}
                    current={current}
                    changeCurrent={changeCurrent}
                    passId={passId}
                />
            ),
        },
        {
            title: "Diagnostico",
            content: (
                <ReferenceACSPSInformationEdit
                    length={3}
                    current={current}
                    changeCurrent={changeCurrent}
                    referenceState={reference}
                    passId={passId}
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

export default StepperEditACSPS;
