#!/bin/sh

# Start Next.js application
echo "Starting Next.js..."
node server.js &
NEXT_PID=$!

# Start Telegram Bot
echo "Starting Telegram Bot..."
cd bot
node index.js &
BOT_PID=$!

# Wait for any process to exit
wait $NEXT_PID $BOT_PID
