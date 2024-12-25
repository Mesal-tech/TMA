import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the bot token from the .env file
const botToken = process.env.TELEGRAM_BOT_TOKEN;

// Check if the token exists
if (!botToken) {
  console.error('Error: BOT_TOKEN is not defined in the .env file.');
  process.exit(1);
}

// Create a new Telegraf bot instance
const bot = new Telegraf(botToken);

// Command: /start
bot.start((ctx) => {
  ctx.reply('Welcome! This is your Telegram bot. Use /help to see available commands.');
});

// Command: /help
bot.help((ctx) => {
  ctx.reply('Here are the commands you can use:\n/start - Start the bot\n/help - Get help');
});

// Respond to any text message
bot.on('text', (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

// Launch the bot
bot.launch()
  .then(() => console.log('Bot is running...'))
  .catch((err) => console.error('Failed to launch bot:', err));

// Graceful shutdown on termination signals
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));