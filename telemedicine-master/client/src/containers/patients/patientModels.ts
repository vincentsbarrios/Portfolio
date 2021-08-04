export interface Patient {
  id: number;
  idNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  address: string;
  contacts: string;
  nationality: string;
}

export interface CreatePatient {
  idNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  address: string;
  contacts: string;
  nationality: string;
}

export interface UpdatePatient {
  idNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  address: string;
  contacts: string;
  nationality: string
}
