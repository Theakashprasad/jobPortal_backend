import { Schema, model } from "mongoose";
import IJob from "../Interface/job";

const JobSchema = new Schema<IJob>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },

    title: { type: String, required: true },
    companyId: { type: Number, required: true },

    country: { type: String, required: true },
    city: { type: String, required: true },
    fullyRemote: { type: Boolean, default: false },

    minSalary: { type: Number },
    maxSalary: { type: Number },
    salaryType: {
      type: String,
      enum: ["Yearly", "Monthly", "Hourly"],
    },

    description: { type: String, required: true },
    tags: { type: String },

    jobRole: { type: String },
    educationLevel: { type: String },
    experienceLevel: { type: String },
    jobType: { type: String },
    jobLevel: { type: String },

    expirationDate: { type: Date },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const Job = model<IJob>("Job", JobSchema);

export default Job;
