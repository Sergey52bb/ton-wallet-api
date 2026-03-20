const express = require('express');
const app = express();

app.get('/user', async (req, res) => {
  const chatId = req.query.id;
  const user = users[chatId];

  if (!user) return res.json({ error: 'User not found' });

  let balance = 0;

  try {
    const bal = await client.getBalance(Address.parse(user.address));
    balance = Number(bal) / 1e9;
  } catch {}

  res.json({
    address: user.address,
    balance: balance
  });
});

app.listen(3000, () => console.log('API запущен'));