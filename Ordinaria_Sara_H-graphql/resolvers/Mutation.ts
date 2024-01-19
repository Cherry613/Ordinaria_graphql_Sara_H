import mongoose from "npm:mongoose@8.0.0";
import { contactoModel } from "../db/Contacto.ts";
import { Contacto } from "../types.ts";
import { dataTelefono } from "./dataTelefono.ts";
import { GraphQLError } from "graphql";


export const Mutation = {

    addContact: async (_: unknown, args:{nombre_completo: string, num_tlf:string}): Promise<Contacto> => {
        try {
            //comprobar que estan los datos necesarios
            if(!args.nombre_completo || !args.num_tlf) throw new GraphQLError("Faltan datos");
            //coger datos de la api de validate phone
            const data_tlf = await dataTelefono(args.num_tlf);
            //comprobar si el numero de telefono es válido
            if(!data_tlf.is_valid) throw new GraphQLError("El numero de telefono no es valido");

            const contacto =  new contactoModel({nombre_completo: args.nombre_completo, num_tlf: args.num_tlf, pais: data_tlf.country})
            await contacto.save();

            return {    //tengo q devolver la hora al crear??
                nombre_completo: contacto.nombre_completo,
                num_tlf: contacto.num_tlf,
                pais: data_tlf.country,
            };
        }catch(error){
            return error.message;
        }
    },
    deleteContact: async (_: unknown, args: {id: string}): Promise<boolean> => {
        try{
            const contacto = await contactoModel.findOneAndDelete({_id: args.id}).exec();
            if(!contacto) return false;
            
            return true;
        }catch(error){
            return error.message
        }
    },

    updateContact: async (_: unknown, args: {id: string, nombre_completo: string, num_tlf: string}): Promise<Contacto> => {
        try {
            const data_tlf = await dataTelefono(args.num_tlf);
            const contacto = await contactoModel.findOneAndUpdate({_id: args.id}, {nombre_completo: args.nombre_completo, num_tlf: args.num_tlf, pais: data_tlf.country}).exec();
            if(!contacto) throw new Error (`No se ha actualizado al contacto con id ${args.id}`)
            return contacto;
       
        }catch (error){
            return error.message;
        }
    }

}


