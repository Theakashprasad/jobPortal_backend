import User from "../Models/userModel";
import { Response } from "express";
import { CustomRequest } from "../Middlewares/authenticationMiddleware";
import IMulterS3File from "../Interface/multerInterface";
import Job from "../Models/jobModel";

export const getJobs = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
   const companyId = Number(id);

   if (isNaN(companyId)) {
    return res.status(400).json({ message: "Invalid companyId" });
  }
  
  const jobs = await Job.find({ companyId }).sort({ 
    createdAt: -1,
  });
// console.log('all data',jobs)
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Get Jobs By Company Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getOneJob = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

  const job = await Job.findById(id);

  console.log('data', job)
// console.log('all data',jobs)
    return res.status(200).json(job);
  } catch (error) {
    console.error("Get Jobs By Company Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    }); 
  }
};

export const postJob = async (req: CustomRequest, res: Response) => {
  try {
    // const { data } = req.body;
    const jobData = req.body;

    console.log("Incoming Job Data:", jobData);

    // Optional: attach logged-in user
    if (req.user) {
      jobData.user = req.user;
    }

    const newJob = await Job.create(jobData);
        console.log('DB UPDATE',newJob)
    return res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Post Job Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  
  }
};

export const editJob = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,        // return updated document
        runValidators: true, // apply schema validation
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });

  } catch (error) {
    console.error("Update Job Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const deleteJob = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
     console.log('id', id)
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
      job: deletedJob,
    });

  } catch (error) {
    console.error("Delete Job Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
