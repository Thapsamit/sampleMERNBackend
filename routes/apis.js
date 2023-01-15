import express from "express";
import mongoose from "mongoose";
import FormDetails from "../models/FormDetails.js";
import { generatePreSignedPutUrl } from "../s3/s3.js";
const router = express.Router();

router.post("/submitForm", async (req, res) => {
  const {
    investmentDetails,
    applicantDetails,
    bankingPreference,
    nomineeDetails,
    investmentRisk,
  } = req.body;

  try {
    const result = await FormDetails.create({
      investmentDetails: investmentDetails,
      applicantDetails: applicantDetails,
      bankingPreference: bankingPreference,
      nomineeDetails: nomineeDetails,
      investmentRisk: investmentRisk,
    });

    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something Went Wrong!!" });
  }
});

router.post("/s3url", async (req, res) => {
  let url;
  try {
    url = await generatePreSignedPutUrl(req.body.fileName, req.body.fileType);
  } catch (err) {
    res.status(500).send({ ok: false, error: `failed to get url: ${err}` });
    return;
  }
  res.send({ url });
});

export default router;
