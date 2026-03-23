const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8715661147:AAGPQcf5RNvaWA57Y2yQxbLYyUE39liMnSU'; // ← вставь свой токен
const WEBAPP_URL = 'https://sergey52bb.github.io/grok-autotrade/';

const bot = new TelegramBot(TOKEN, { polling: true });

// команда старт
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
