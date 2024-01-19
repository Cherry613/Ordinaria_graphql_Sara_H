import mongoose from "npm:mongoose@8.0.0";

export const Query = {
    getEjemplo: ():String => {
        try{
            
            return "";
        }catch(error){
            return error.message;
        }
    }
}