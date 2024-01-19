import mongoose from "npm:mongoose@8.0.0";

export const Mutation = {

    ejemplo: async (_: unknown, args:{ejemplo:string}) => {
        try {

        }catch(error){
            return error.message;
        }
    }
}