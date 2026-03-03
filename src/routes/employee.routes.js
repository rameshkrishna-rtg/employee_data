const express =require("express");
const router =express.Router();
const {createEmployee,createEmployees,getEmpData,
        getDataById,updatePhno,
        deleteAllData,deleteById,deleteByEmail}=require('../controllers/emp.controller');


router.post("/insert",createEmployee);
router.post("/insertMany",createEmployees);
router.get("/data",getEmpData);
router.get("/dataById/:id",getDataById);
router.put("/update/:id/phno",updatePhno);
router.delete("/deleteAll",deleteAllData);
router.delete("/deleteById/:id",deleteById);
router.delete("/deleteByEmail/:email1/:email2",deleteByEmail);

module.exports=router;
