import {Patient} from "../patients/patientModels";

export interface CreateReferenceACSPSForm {
    date: Date;
    community: string;
    patientId: number;
    motive: string;
    referrer: string;
    referrerPhone: string;
    referrerEmail: string;
    actionTaken: string;
    originHfId: string;
    destinationHfId: string;
}

export interface ReferenceACSPSForm {
    Id: number;
    date: Date;
    community: string;
    patientId: number;
    motive: string;
    referrer: string;
    referrerPhone: string;
    referrerEmail: string;
    actionTaken: string;
    originHfId: number;
    destinationHfId: number;
    selectedPatient?: Patient
}

export interface Reference {
    id: number;
    originHfId: number;
    destinationHfId: number;
    patientId: number;
}
