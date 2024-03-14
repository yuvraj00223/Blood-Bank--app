const inventoryModel = require("../models/inventoryModel");
const userModel =require("../models/userModel");

//creaate inventory
const createInventoryController = async(req,res) =>{
    try{
        const {email,inventoryType} = req.body
      //validiation
      const user = await userModel.findOne({email})
      if(!user){
        throw new Error('User not Found')
      }
      if(inventoryType === "in" && user.role !== 'donar'){
        throw new Error('Not A Donar account')
      }
      if(inventoryType === "out" && user.role !== 'hospital'){
        throw new Error('Not a hospital')
      }
      //save record
      const inventory=new inventoryModel(req.body)
      await inventory.save()
      return res.status(201).send({
        success:true,
        message:"New Blood Record Added",
        error,
      })
    }catch(error){
      console.log(error)
      return res.status(500).send({
        success:false,
        message:'Error In Create Inventory API',
        error
      })
    }
}; 


//GET ALL BLOOD RECORDS
const getInventoryController = async(res,req) =>{
  try{
     const inventory = await inventoryModel.find({
      organisation:req.body.userId})
      .populate('donar')
      .populate('hospital')
      .sort({createdAt:-1})
     return res.status(200).send({
      success:true,
      message:"get all records successfully",
      inventory,
     });
  }catch(error){
     console.log(error)
     return res.ststus(500).send({
      success:false,
      message:'Error In Get All Inventory',
      error,
     });
  }
};
module.exports = { createInventoryController,getInventoryController};