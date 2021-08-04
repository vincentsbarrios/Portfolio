import axios from "axios";
import {
  CreateReferenceACSPSForm,
  ReferenceACSPSForm,
  Reference,
} from "./referenceCommunityAgentHealthPromoterModel";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/referencesCommunityAgentHealthPromoter`;

export async function create(form: CreateReferenceACSPSForm) {
  await axios.post(baseUrl, form);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as ReferenceACSPSForm[];
}

export async function findById2(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return (response.data as ReferenceACSPSForm[])[0];
  // return response.data as Hospital;
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}

export async function update(reference: ReferenceACSPSForm) {
  console.log(reference.Id);
  await axios.put(`${baseUrl}/${reference.Id}`, reference);
}

export async function allR() {
  const response = await axios.get(baseUrl);
  return response.data as Reference[];
}
