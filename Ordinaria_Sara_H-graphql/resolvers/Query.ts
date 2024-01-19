import mongoose from "npm:mongoose@8.0.0";
import { Contacto } from "../types.ts";
import { contactoModel } from "../db/Contacto.ts";
import { dataTelefono } from "./dataTelefono.ts";
import { getCapital } from "./getCapital.ts";
import { worldTime } from "./worldTime.ts";

export const Query = {
    getContact: async(_: unknown, args: {id: string}) => {
        try{
            const contacto = await contactoModel.findOne({_id: args.id}).exec();
           
            if(!contacto){
                throw new Error ("No se ha encontrado ese contacto")
            }

            const data_tlf = await dataTelefono(contacto.num_tlf);
            const capital = await getCapital(data_tlf.country);
            const hora = await worldTime(capital[0].capital)

            return{
                nombre_completo: contacto.nombre_completo,
                num_tlf: contacto.num_tlf,
                pais: data_tlf.country,
                hora: hora.datetime
            };
        }catch(error){
            return error.message;
        }
    },

    getContacts: async ()=> {
        try{
            const contactos = await contactoModel.find().exec();    //array de contactos
            //recorrer todos los contactos del array y para cada uno coger su pais y su hora con las apis 
            const datos_contactos = Promise.all(contactos.map(async (contacto) => {
                const data_tlf = await dataTelefono(contacto.num_tlf);
                const capital = await getCapital(data_tlf.country);
                const hora = await worldTime(capital[0].capital);

                return {
                    hora: hora
                }
            }))
            


            return contactos;

        }catch(error){
            return error.message
        }
    }
}
