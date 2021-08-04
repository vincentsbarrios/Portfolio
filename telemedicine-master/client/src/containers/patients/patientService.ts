import axios from "axios";
import { CreatePatient, UpdatePatient, Patient } from "./patientModels";
import moment from "moment";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/patients`;

export async function create(network: CreatePatient) {
  await axios.post(baseUrl, network);
}

export async function all() {
  const response = await axios.get(baseUrl);
  const data = response.data as Patient[];
  return data.map((patient) => ({
    ...patient,
    dateOfBirth: new Date(patient.dateOfBirth),
  }));
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);
  const patient = (response.data as Patient[])[0];
  return {
    ...patient,
    dateOfBirth: new Date(patient.dateOfBirth),
  };
}

export async function searchById(id: string) {
  const response = await axios.get(`${baseUrl}`, {
    params: {
      idNumber: id,
      limit: 50,
      multipleResults: true,
    },
  });

  return response.data as Patient[];
}

export async function update(patient: Patient) {
  await axios.put(`${baseUrl}/${patient.id}`, patient);
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}

export async function IdNumberExists(idNumber: string) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        idNumber,
      },
    });

    const data = response.data as Patient[];
    return data.length > 0;
  } catch (e) {
    console.log(e);
  }
}

export async function ForeignIdNumberExists(foreignIdNumber: string) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        foreignIdNumber,
      },
    });

    const data = response.data as Patient[];
    return data.length > 0;
  } catch (e) {
    console.log(e);
  }
}

export async function EmailExists(email: string) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        email,
      },
    });

    const data = response.data as Patient[];
    return data.length > 0;
  } catch (e) {
    console.log(e);
  }
}
