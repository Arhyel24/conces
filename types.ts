export type Member = {
  id: string;
  idNumber: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  department: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  interests: string;
  hobbies: string;
  bestEngineeringQuote: string;
  submittedAt: string;
};

export interface AdminCredentials {
  username: string;
  password: string;
}

export type Page = "landing" | "register" | "admin" | "dashboard";

export interface PublicMember {
  idNumber: string;
  fullName: string;
  department: string;
  interests: string;
  hobbies: string;
  bestEngineeringQuote: string;
  dayMonth: string; // Only day and month from DOB
}
