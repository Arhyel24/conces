import mongoose, { Schema, Document } from "mongoose";

export interface Member extends Document {
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
}

const MemberSchema: Schema = new Schema({
  idNumber: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  stateOfOrigin: { type: String, required: true },
  interests: { type: String, required: true },
  hobbies: { type: String, required: true },
  bestEngineeringQuote: { type: String, required: true },
  submittedAt: { type: String, required: true },
});

export default mongoose.models.Member ||
  mongoose.model<Member>("Member", MemberSchema);
