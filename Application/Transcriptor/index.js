const fs = require('fs');
const { createClient } = require('@deepgram/sdk');
require('dotenv').config();

async function transcriptorAudio(filename, _apikey){
    try {

        //url del proveedor con usuario github: https://console.deepgram.com/
        //costo por transcripcion: 3 transcripciones/centavo

        // Espera 1.8 segundos antes de ejecutar la transcripción
        console.warn('Estableciendo conexión con el motor de transcripción...');
        await new Promise(resolve => setTimeout(resolve, 1800));
        const deepgram = createClient(_apikey);
        console.log('Conectado al agente');
        
        // Espera 1.5 segundos antes de ejecutar la transcripción
        console.log('"\x1b[33m%s\x1b[0m"','Generando transcripción...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            fs.readFileSync(filename),
            {punctuate: true, model: 'nova-2', language: 'es-419' },
        );

        if (error) throw error;
        if (!error)
        {
            if(result.metadata.channels == 1)
                console.dir(result.results.channels[0].alternatives[0].transcript, {depth: null});
        } 
    } catch (error) {
        console.error("Error en la transcripción:", error.response?.data || error.message);
    }
}

module.exports = { transcriptorAudio }; // Exportamos la función