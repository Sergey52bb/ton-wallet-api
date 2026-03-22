// ==== Зависимости ====
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { mnemonicNew, mnemonicToWalletKey } = require('ton-crypto');
const { WalletContractV4, TonClient } = require('ton');
const { Address } = require('ton-core');
const fs = require('fs');

// ==== Настройки ====
const TOKEN = '8715661147:AAGPQcf5RNvaWA57Y2yQxbLYyUE39liMnSU'; // вставь свой Telegram токен
const WEBAPP_URL = 'https://sergey52bb.github.io/webapp/';

const bot = new TelegramBot(TOKEN, { polling: true });
const client = new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });

// ==== Данные пользователей ====
let users = {};
if (fs.existsSync('wallets.json')) {
  users = JSON.parse(fs.readFileSync('wallets.json'));
}
function saveData() {
  fs.writeFileSync('wallets.json', JSON.stringify(users, null, 2));
}

// ==== Telegram: старт ====
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  if (!users[chatId]) {
    const mnemonic = await mnemonicNew();
    const key = await mnemonicToWalletKey(mnemonic);
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    users[chatId] = { mnemonic, address: wallet.address.toString() };
    saveData();
  }

  // ---- Кнопка Open Wallet ----
  bot.sendMessage(chatId, '💎 SYN/WALLET BOT\nНажмите кнопку, чтобы открыть кошелек:', {\nНажмите кнопку, чтобы открыть кошелек:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💼 Open Wallet', web_app: { url: WEBAPP_URL } }]
      ]
    }
  });
});

// ==== Express API для Mini App ====
const app = express();

// главная страница для Render
app.get('/', (req, res) => res.send('TON Wallet API работает 🚀'));

// API для Mini App
app.get('/user', async (req, res) => {
  const chatId = req.query.id;
  const user = users[chatId];
  if (!user) return res.json({ error: 'User not found' });

  let balance = 0;
  try {
    const bal = await client.getBalance(Address.parse(user.address));
    balance = Number(bal) / 1e9;
  } catch {}

  res.json({ address: user.address, balance });
});

// ==== Render-ready порт ====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API запущен на порту ' + PORT));
