import Electronics from "../models/electronicModels.js";

export async function getAllElectronic(_, res) {
  try {
    const electronics = await Electronics.find().sort({ createdAt: -1 });
    res.status(200).json(electronics);
  } catch (error) {
    console.error("Error in getAllElectronics controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getElectronicById(req, res) {
  try {
    const electronics = await Electronics.findById(req.params.id);
    if (!electronics) return res.status(404).json({ message: "Electronic not found" });
    res.status(200).json(electronics);
  } catch (error) {
    console.error("Error in getElectronicById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createElectronic(req, res) {
  try {
    const {
      product_id,
      name,
      type,
      brand,
      selling_price,
      stock_in,
      purchased_at,
      color
      
    } = req.body;
    if 
      (
      !product_id ||
      !name ||
      !type ||
      !brand ||
      !selling_price ||
      stock_in == null ||
      !purchased_at ||
      !color 
      
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const electronics = new Electronics({
      product_id,
      name,
      type,
      brand,
      selling_price,
      stock_in,
      purchased_at,
      color
    });

    const savedElectronics = await electronics.save();
    res.status(201).json({ savedElectronics });
  } catch (error) {
    console.error("Error in createElectronics controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateElectronic(req, res) {
  try {
    const {
      product_id,
      name,
      type,
      brand,
      selling_price,
      stock_in,
      purchased_at,
      color
    } = req.body;
    const updatedElectronics = await Electronics.findByIdAndUpdate(
      req.params.id,
      {
        product_id,
        name,
        type,
        brand,
        selling_price,
        stock_in,
        purchased_at,
        color,
      },
      { new: true },
    );
    if (!updatedElectronics)
      return res.status(404).json({ message: "Electronics not found" });
    res.status(200).json(updatedElectronics);
  } catch (error) {
    console.error("Error in updateElectronics controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteElectronic(req, res) {
  try {
    const deletedElectronics = await Electronics.findByIdAndDelete(req.params.id);
    if (!deletedElectronics)
      return res.status(404).json({ message: "Electronics not found" });
    res.status(200).json({ message: "Electronics Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteElectronics controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
