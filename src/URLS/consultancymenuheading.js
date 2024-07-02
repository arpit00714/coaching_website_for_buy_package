import { appuri } from "../appUri/appUri"

export const consultancyheading = async()=>{
    try{
        const endpoint = `${appuri}consultantmenu/getheading`
        const response = await  fetch(endpoint)
        return response
    }
    catch(err){
        console.log(err)
    }
}