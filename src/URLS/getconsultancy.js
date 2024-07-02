import { appuri } from "../appUri/appUri"

export const getconsultancylist = async()=>{
    try{
        const endpoint = `${appuri}addconsultancy/getconsultancy`
        const response = await  fetch(endpoint)
        return response
    }
    catch(err){
        console.log(err)
    }
}