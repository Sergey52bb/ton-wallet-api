const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8715661147:AAGPQcf5RNvaWA57Y2yQxbLYyUE39liMnSU';
const WEBAPP_URL = 'https://sergey52bb.github.io/grok-autotrade/';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('polling_error', (error) => {
  console.log('Polling error:', error.message);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    '💎 SYN TERMINAL\nAI Trading System\n\n🚀 Открыть терминал:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Open Terminal', web_app: { url: WEBAPP_URL } }]
        ]
      }
    }
  );
});


// 👇 ВСТАВИТЬ ВОТ ЭТО В САМЫЙ НИЗ
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
