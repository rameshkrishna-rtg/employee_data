const prisma = require("../config/prisma");


//POST-CreateEmployee/web
const createEmployee = async (req, res) => {
    try {
        const employee = await prisma.employee.create({
            data: req.body
        });

        console.log(employee);
        res.status(201).json({

            message: `Employee data created`
        });
    }
    catch (err) {
        if (err.code === "P2002") {
            return res.status(400).json({
                error: "Email or phone number is already exists"
            });
        }
        else
            return res.status(500).json({
                status: "error",
                error: err.message
            });
    }
};
//POST-CreateEmployees/web
const createEmployees = async (req, res) => {
    try {
        const employee = await prisma.employee.createMany({
            data:
                req.body

        });
        console.log(employee);
        return res.status(201).json({
            status: "Success",
            message: "Employees created successfully"
        })
    } catch (err) {
        console.log("CreateEmployees API", err)

        if (err.code === "P2002") {
            return res.status(400).json({
                error: "Email or phone number is already exists"
            });
        }
        return res.status(404).json({
            status: "Error",
            error: err.message
        });
    }

};

//GET-getEmployeeData/web
const getEmpData = async (req, res, next) => {
    try {
        const employee = await prisma.employee.findMany();
        res.status(200).json(employee);
    } catch (err) {
        res.status(500);
        next(err);

    }
};

//GET-getDataById/web
const getDataById = async (req, res) => {
    try {


        const employee = await prisma.employee.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!employee) {
            return res.status(404).json({
                status: "error",
                message: "Employee not found for this id"
            });

        }

        return res.json({
            status: "success",
            data: employee
        });

    } catch (err) {

        console.log("DataById ", err);

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: err.message
        })
    }
}

//PUT-updatePhno
const updatePhno = async (req, res) => {
    try {
        const employee = await prisma.employee.update({
            where: { id: Number(req.params.id) },
            data: {
                phno: req.body.phno
            }
        });
        console.log(req.body.phno);
        return res.status(200).json({
            status: "Success",
            message: "Phone number updated",
            data: employee
        });

    } catch (err) {
        console.log("phno updation", err);
        if (err.code === "2025") {
            return res.status(404).json({
                error: "Employee not for the id"
            });
        }
        return res.json({
            status: "error",
            message: err.message
        });
    }
};

//DELETE-deleteALlData/web
const deleteAllData = async (req, res) => {
    try {
        const employee = await prisma.employee.deleteMany();
        if (employee.count !== 0) {
            return res.json({
                status: "Success",
                message: "Data deleted successfully"
            });
        }
        return res.json({
            message: "No data are there to delete already"
        });
    } catch (err) {
        console.log("DeleteMany API Error", err);

        return res.json({
            status: "error",
            error: err.message
        });
    }
};

//DELETE-deleteById/web
const deleteById = async (req, res) => {
    try {
        const employee = await prisma.employee.delete({
            where: { id: Number(req.params.id) }
        });
        console.log(employee);
        return res.json({
            status: "success",
            message: "Data deleted successfully"
        });
    } catch (err) {
        console.log("deleteById API error", err);
        return res.json({
            status: "error",
            message: err.message
        });
    }
};

//DELETE-deleteDataByEmail
const deleteByEmail = async (req, res) => {
    try {
        const employee = await prisma.employee.deleteMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: req.params.email1
                        }

                    }, {
                        email: {
                            contains: req.params.email2
                        }
                    }
                ]
            }

        });
        if(employee.count !==0){
            return res.status(201).json({
            status: "Success",
            message: "Data deleted successfully"
        });
        }
        else
            return res.status(404).json({
                status:"Decline",
                Message:"No more related data to delete"
        })
       
    } catch (err) {
        console.log("DeleteByEmail", err)

        return res.json({
            status: "error",
            message: err.message
        });

    }

};

module.exports = {
    createEmployee,
    createEmployees,
    getEmpData,
    getDataById,
    updatePhno,
    deleteAllData,
    deleteById,
    deleteByEmail
}