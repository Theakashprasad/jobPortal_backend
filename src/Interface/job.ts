import { Types } from "mongoose";

export default interface IJob {
  user?: Types.ObjectId;

  title: string;
  companyId: string;

  country: string;
  city: string;
  fullyRemote: boolean;

  minSalary?: number;
  maxSalary?: number;
  salaryType?: string;

  description: string;
  tags?: string;

  jobRole?: string;
  educationLevel?: string;
  experienceLevel?: string;
  jobType?: string;
  jobLevel?: string;

  expirationDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
