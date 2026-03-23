const TelegramBot = require('node-telegram-bot-api');

const TOKEN = 'ТВОЙ_ТОКЕН'; // вставь сюда свой токен
const WEBAPP_URL = 'https://sergey52bb.github.io/grok-autotrade/';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
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
