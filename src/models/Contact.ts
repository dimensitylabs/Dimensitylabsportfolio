import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: false },
  service: { type: String, required: false },
  budget: { type: String, required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
