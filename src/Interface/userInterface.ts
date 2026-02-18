import { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  image?: string;
  companyName?: string;
  orgType?: string;
  industryType?: string;
  teamSize?: string;
  yearEstablished?: string;
  aboutUs?: string;
  location?: string;
  contactNumber?: string;
  logo?: string;
  isProfileComplete: Boolean,
  
}

export default IUser;
