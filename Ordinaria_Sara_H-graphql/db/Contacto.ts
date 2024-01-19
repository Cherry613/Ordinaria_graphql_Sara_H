import mongoose from "npm:mongoose@8.0.0";
import { Contacto } from "../types.ts";

const Schema = mongoose.Schema;
const contactoSchema = new Schema (
    {
        nombre_completo: {type: String, required: true, lowercase: true},
        num_tlf: {type: String, required:true, unique: true},
        pais: {type: String, required: false, default: ""}
    },
    {timestamps: true}
);


export type contactoModelType = mongoose.Document & Omit<Contacto, "id">;

export const contactoModel = mongoose.model<contactoModelType> ("Contacto", contactoSchema)