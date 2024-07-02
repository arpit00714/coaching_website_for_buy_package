import { appuri } from "../appUri/appUri"

export const consheading = async()=>{
    try{
        const endpoint = `${appuri}consultancyslider/consultancyslider`
        const response = await  fetch(endpoint)
        return response
    }
    catch(err){
        console.log(err)
    }
}