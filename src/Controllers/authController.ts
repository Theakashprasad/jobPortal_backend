import User from "../Models/userModel";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { generateAccessToken } from "../utils/jwtUtils";
import { CustomRequest } from "../Middlewares/authenticationMiddleware";
import Blog from "../Models/jobModel";
import IMulterS3File from "../Interface/multerInterface";

export const postSignup = async (req: Request, res: Response) => {
  try {
    const {firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ Message: "User already exists with this email" });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        firstName: firstName.toLowerCase().trim(),
        lastName: lastName.toLowerCase().trim(),
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).send(newUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Message: "Internal Server Error" });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  console.log("post login");
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
      .status(404)
      .send({ Message: "User not found with this email" });
    }
    
    const isPasswordMatch = await comparePassword(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).send({ Message: "Password does not match" });
    }


    const accessToken = await generateAccessToken({
      email: existingUser.email,
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 🔥 7 days
    });
    console.log("done");
    return res.status(200).send({
      existingUser,
      accessToken,
      Message: "Authentication verified", 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Message: "Internal Server Error" });
  }
};

export const accountSetup = async (req: CustomRequest, res: Response) => {
  try {
    const {
      userId,
      companyName,
      orgType,
      industryType,
      teamSize,
      yearEstablished,
      aboutUs,
      location,
      contactNumber,
      email,
      logoPreview,
    } = req.body; 
console.log('data', req.body  )
    if (!userId) {
      return res.status(401).send({ Message: "Authentication required" });
    }

    // Find the user by email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ Message: "User not found" });
    }

    // Update user with account setup data
    user.companyName = companyName?.trim();
    user.orgType = orgType;
    user.industryType = industryType;
    user.teamSize = teamSize;
    user.yearEstablished = yearEstablished?.trim();
    user.aboutUs = aboutUs?.trim();
    user.location = location?.trim();
    user.contactNumber = contactNumber?.trim();
    user.email = email?.trim() || user.email;
    user.logo = logoPreview;
    user.isProfileComplete = true
 

    await user.save();

    const accessToken = await generateAccessToken({
      email: user.email,
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 🔥 7 days
    });

    console.log("done"); 
    return res.status(200).send({
      Message: "Account setup completed successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Message: "Internal Server Error" });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    console.log('helo')
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,   // true in production (https)
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
