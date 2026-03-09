import express from "express";
import {
  createElectronic,
  deleteElectronic,
  getAllElectronic,
  getElectronicById,
  updateElectronic,
} from "../controllers/electronicController.js";

const router = express.Router();

router.get("/", getAllElectronic);
router.get("/:id", getElectronicById);
router.post("/", createElectronic);
router.put("/:id", updateElectronic);
router.delete("/:id", deleteElectronic);

export default router;
