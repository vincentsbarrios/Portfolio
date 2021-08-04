import React, {useEffect, useState} from "react";
import {Steps, Button} from "antd";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";
import ReferenceInformation from "./steps/ReferenceInformation";
import HospitalSearching from "./steps/HospitalSearching";
import {PatientReferenceInformation, RRForm} from "../referenceFormModels";
import { Link } from "@reach/router";
import PatientReference from "./steps/PatientReference";

const {Step} = Steps;

function Stepper(props: any) {
    const [current, setCurrent] = useState(0);
    const [reference, setReference] = useState({} as RRForm);
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
            lastName: patient.lastName

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
                <PatientReference current={current} changeCurrent={changeCurrent}
                                  referenceState={reference} setPatientInfo={setPatientInfo}/>
            ),
        },
        {
            title: "Establecimiento de Salud",
            content: (
                <HospitalSearching
                    onOrigin={originHandler}
                    onDestination={destinationHandler}
                    onInstitution={institutionHandler}
                    length={3}
                    referenceState={reference}
                    current={current}
                    changeCurrent={changeCurrent}

                />
            ),
        },
        {
            title: "Diagnostico",
            content: (
                <ReferenceInformation
                    length={3}
                    current={current}
                    changeCurrent={changeCurrent}
                    referenceState={{...reference}}
                    setReference={setReference}
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
          icon={<ArrowLeftOutlined />}
          style={{ marginBottom: "40px" }}
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

export default Stepper;
