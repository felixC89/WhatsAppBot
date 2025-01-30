const qrcode = require('qrcode-terminal');
//const qrcode = require('qrcode');
const { MessageMedia } = require('whatsapp-web.js');
const { Client } = require('whatsapp-web.js');
const {transcriptorAudio} = require('../WhatsAppBot/Application/Transcriptor');
const path = require('path');
require('dotenv').config();

const client = new Client();

const conteo = path.join(__dirname, 'Audios','Test','Conteo.mp3');

(async()=> {
    const data = await transcriptorAudio(conteo,
         process.env.DEEPGRAM_API_KEY);
    console.log(data);
})()

/*client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});*/

/*client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
});*/

client.on('ready', () => {
    console.log('Cliente conectado!');
});

client.on('message', async (message) => {

    if(message.body.toLocaleLowerCase.includes('hora'))
    {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          };
          
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
        await message.reply(`La hora es: ${formattedDate}`);
        return;
    }

    if(message.body.toLocaleLowerCase().includes('dia') || message.body.toLocaleLowerCase().includes('día'))
    {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
        await message.reply(`El día es: ${formattedDate}`);
        return;
    }

	if (message.body.toLocaleLowerCase().includes('saludo') || message.body.toLocaleLowerCase().includes('hola') || message.body.toLocaleLowerCase().includes('amistad')) {
		await message.reply('Hola soy un bot, mi creador esta ocupado ayudando a gohan a salvar la tierra!');

        const media = MessageMedia.fromFilePath('./imgs/help-gohan.png');
        await client.sendMessage(message.from, media);
	}

});



client.initialize();
 