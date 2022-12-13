// Initialize Module
const asyncHandler = require('express-async-handler')

// Initialize Auth Permission
const {hasRequiredDelegatedPermissions,} = require('../config/permissionUtils');
const authConfig = require('../authConfig');


const getProjects = asyncHandler(async (req, res) =>{
    if (hasRequiredDelegatedPermissions(req.authInfo, authConfig.protectedRoutes.projects.delegatedPermissions.read)) {
        try {
            /**
             * The 'oid' (object id) is the only claim that should be used to uniquely identify
             * a user in an Azure AD tenant. The token might have one or more of the following claim,
             * that might seem like a unique identifier, but is not and should not be used as such,
             * especially for systems which act as system of record (SOR):
             */
            const owner = req.authInfo['oid'];
            console.log("Hello1111")

            res.status(200).send("permissions");
        } catch (error) {
            next(error);
        }
    } else {
        next(new Error('User does not have the required permissions'))
    }
})

// const setProject = asyncHandler(async (req, res) =>{
//     if(!req.body.project_name || !req.body.software_name || !req.body.dept_name){
//         console.log(req.body)
//         res.status(400)
//         throw new Error("Please add mandatory fields")    
//     }
//     else if(req.body.project_name && req.body.dept_name){
//         const query={
//             $and : [
//                 { project_name: req.body.project_name },
//                 { dept_name: req.body.dept_name }
//             ]
//         }
//         const find_proj=await Project.findOne(query).exec()
//         console.log("project",find_proj)
//         res.status(200)
//         throw new Error("Project is already created")
//     }
//     else{
//         console.log(req.body)
//     const project = await Project.create({
//         project_name : req.body.project_name,
//         software_name : req.body.software_name,
//         dept_name : req.body.dept_name,
//         created_by : req.body.created_by,
//         created_datetime : req.body.created_datetime
//     })
//     res.status(200).json(project)
// }
// })

// const updateProject = asyncHandler(async (req, res) =>{
//     const update_query = await Project.findOneAndUpdate({_id:req.params.id},{
//         project_name : req.body.project_name,
//         software_name : req.body.software_name,
//         dept_name : req.body.dept_name
//     },{new:true})
//         console.log(update_query)
//         res.status(200)
//         res.status(200).json(update_query)
// })

// const deleteProject = asyncHandler(async (req, res) =>{
//     const delete_query = await Project.findOneAndRemove({_id:req.params.id})
//         console.log(delete_query)
//         res.status(200)
//         res.status(200).json({"message": "Project deleted successfully!!"})
// })

module.exports = {
                    getProjects
                    // setProject,
                    // updateProject,
                    // deleteProject
                 }


