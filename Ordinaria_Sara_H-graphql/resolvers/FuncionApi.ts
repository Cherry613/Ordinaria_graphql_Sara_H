import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; // Leer variables de entorno
const env = await load(); // Carga Variables de entorno

export const getAnimalInfoFromAPI = async (animalName: string) => {
    const API_KEY = env.API_KEY || Deno.env.get("API_KEY");
    const url = `https://api.api-ninjas.com/v1/animals?name=${animalName}`;
    const headers = { 'X-Api-Key': `${API_KEY}` };
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error('Error: ' + response.status + ' ' + await response.text());
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Request failed: ' + error.message);
    }
};