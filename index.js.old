const express = require('express');
const QRCode = require('qrcode');
const { Client } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');

const client = new Client();
const app = express();
const port = process.env.PORT || 3000;

app.get('/qr', async (req, res) => {
  try {
    client.on('qr', async (qr) => {
      const qrCodeImageBuffer = await QRCode.toDataURL(qr, {
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      res.send(`<img src="${qrCodeImageBuffer}" alt="QR Code">`);
    });

    client.on('ready', () => {
      console.log('Cliente conectado!');
  });
  
  client.on('message', async (message) => {
  
      if(message.body.toLowerCase().includes('hora'))
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
  
      if(message.body.toLowerCase().includes('dia') || message.body.toLowerCase().includes('día'))
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
  
    if (message.body.toLowerCase().includes('saludo') || message.body.toLowerCase().includes('hola') || message.body.toLowerCase().includes('amistad')) {
      await message.reply('Hola soy un bot, mi creador esta ocupado ayudando a gohan a salvar la tierra!');
  
          const media = MessageMedia.fromFilePath('./imgs/help-gohan.png');
          await client.sendMessage(message.from, media);
    }
  
      
  
  
  });
  

    client.initialize();
  } catch (error) {
    res.status(500).send('Error initializing WhatsApp client.'+ error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});