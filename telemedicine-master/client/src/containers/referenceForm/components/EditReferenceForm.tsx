import React, {useState, useEffect} from "react";
import {
    ArrowLeftOutlined,
} from "@ant-design/icons";
import {Steps, Button} from "antd";
import {Link} from "@reach/router";
import {PatientReferenceInformation, RRForm, ReferenceEditPatience} from "../referenceFormModels";
import PatientReferenceEdit from "./steps/PatientReferenceEdit";
import HospitalSearchingEdit from "./steps/HospitalSearchingEdit";
import ReferenceInformationEdit from "./steps/ReferenceInformationEdit";

const {Step} = Steps;

function StepperEdit(props: any) {
    const [current, setCurrent] = useState(0);
    const [reference, setReference] = useState({} as RRForm);
    const [referenceId, setReferenceId] = useState({} as ReferenceEditPatience);
    const passId = props.id


    const changeCurrent = (current: number) => {
        setCurrent(current);
    };

    const originHandler = (originHfId: number) => {
        setReference({...reference, originHfId});
    };

    const destinationHandler = (destinationHfId: number) => {
        setReference({...reference, destinationHfId});
    };

    const institutionHandler = (institution: string) => {
        setReference({...reference, institution});
    };

    const setPatientInfo = (patient: PatientReferenceInformation) => {
        setReference({
            ...reference,
            patientId: patient.patientId,
            relationship: patient.relationship,
            address: patient.address,
            companion: patient.companion,
            phone: patient.phone,
            selectedPatient: patient.selectedPatient,
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
            content: (
                <PatientReferenceEdit current={current} changeCurrent={changeCurrent}
                                      referenceState={reference} setPatientInfo={setPatientInfo}
                                      setReference={setReference}
                                      passId={passId}/>
            ),
        },
        {
            title: "Establecimiento de Salud",
            content: (
                <HospitalSearchingEdit
                    onOrigin={originHandler}
                    onDestination={destinationHandler}
                    onInstitution={institutionHandler}
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
                <ReferenceInformationEdit
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
            <Link to="/referenceForm">
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
        </>
    );
}

export default StepperEdit;
