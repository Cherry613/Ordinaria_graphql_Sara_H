import mongoose from "npm:mongoose@8.0.0";
import { Ejemplo } from "../types.ts";


const Schema = mongoose.Schema;
const ejemploSchema = new Schema (
    {
        ejemplo: {type: String, required: true, lowercase: true},
    },
    {timestamps: true}
);

//validaciones y middleware
ejemploSchema
    .path("ejemplo")
    .validate(async function () {})

ejemploSchema.post("save", async function(){

})


export type ejemploModelType = mongoose.Document & Omit<Ejemplo, "id">;

export const ejemploModel = mongoose.model<ejemploModelType> ("Ejemplo", ejemploSchema)