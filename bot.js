const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = '8715661147:AAGPQcf5RNvaWA57Y2yQxbLYyUE39liMnSU';
const WEBAPP_URL = 'https://sergey52bb.github.io/webapp/';

const isRender = process.env.RENDER === 'true';

const bot = new TelegramBot(TOKEN, {
  polling: !isRender
});

let users = {};

if (fs.existsSync('wallets.json')) {
  users = JSON.parse(fs.readFileSync('wallets.json'));
}

function saveData() {
  fs.writeFileSync('wallets.json', JSON.stringify(users, null, 2));
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  if (!users[chatId]) {
    users[chatId] = {
      address: 'EQ_TEST_' + chatId
    };
    saveData();
  }

  bot.sendMessage(chatId, '💎 SYN WALLET\n🚀 Открыть кошелек:', {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '🚀 Open Wallet',
          web_app: {
            url: 'https://sergey52bb.github.io/webapp/'
          }
        }
      ]
    ]
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send('TON Wallet API работает 🚀');
});

app.get('/user', (req, res) => {
  const chatId = req.query.id;
  const user = users[chatId];

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  res.json({
    address: user.address,
    balance: 0
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('🚀 Server started on port ' + PORT);
});
