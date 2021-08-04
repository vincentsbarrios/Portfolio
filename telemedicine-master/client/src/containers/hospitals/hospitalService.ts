import axios from "axios";
import { CreateHospital, Hospital } from "./hospitalModels";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/hospitals`;

export async function create(hospital: CreateHospital) {
  await axios.post(baseUrl, hospital);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as Hospital[];
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return (response.data as Hospital[])[0];
}

export async function update(hospital: Hospital) {
  await axios.put(`${baseUrl}/${hospital.id}`, hospital);
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}

export async function rupsCodeExists(code: number) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        code,
      },
    });

    const data = response.data as Hospital[];

    return data.length > 0;
  } catch (e) {
    console.log(e);
  }
}
