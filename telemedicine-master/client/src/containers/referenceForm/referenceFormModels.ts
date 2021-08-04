import {Patient} from "../patients/patientModels";

export interface CreateRRForm {
    type: string;
    originHfId: number;
    destinationHfId: number;
    institution: string;
    patientId: string;
    motive: string;
    descriptionMotive: string;
    symptoms: string;
    medicalSummary: string;
    vitalSigns: string;
    obGyn: string;
    physicalExamination: string;
    complementaryExams: string;
    diagnosticImpression: string;
    observations: string;
    risk: boolean;
    attentionRequired: string;
    madeBy: string;
    contactedHf: boolean;
    contactId: string;
    date: Date;
    companion: string;
    relationship: string;
    address: string;
    phone: string;
}

export interface PatientReferenceInformation {
    patientId: number;
    companion: string;
    lastName: string;
    relationship: string;
    address: string;
    phone: string;
    selectedPatient: Patient
}

export interface RRForm {
    id: number;
    type: string;
    originHfId: number;
    destinationHfId: number;
    institution: string;
    patientId: number;
    motive: string;
    descriptionMotive: string;
    symptoms: string;
    medicalSummary: string;
    vitalSigns: any;
    obGyn: any;
    physicalExamination: any;
    complementaryExams: string;
    diagnosticImpression: string;
    observations: string;
    risk: boolean;
    attentionRequired: string;
    madeBy: string;
    contactedHf: boolean;
    contactId: string;
    date: Date;
    companion?: string;
    lastName?: string;
    relationship: string;
    address: string;
    phone: string;
    selectedPatient?: Patient
}

export interface ReferenceEditPatience {
    id:number
}

export interface Reference {
  id: number;
  patientId: number;
  originHfId: number;
  destinationHfId: number;
}
