#!/bin/sh

# Start Next.js application in background
echo "Starting Next.js..."
node server.js &
NEXT_PID=$!

# Start Telegram Bot in background
echo "Starting Telegram Bot..."
cd bot
if [ -z "$BOT_TOKEN" ]; then
  echo "ERROR: BOT_TOKEN is missing! Bot will not start."
else
  node index.js &
  BOT_PID=$!
fi

# Monitor loop
while true; do
  # Check if Next.js is still running
  if ! kill -0 $NEXT_PID > /dev/null 2>&1; then
    echo "Next.js process died. Exiting container."
    exit 1
  fi

  # Check if Bot is still running (only if we tried to start it)
  if [ ! -z "$BOT_PID" ]; then
    if ! kill -0 $BOT_PID > /dev/null 2>&1; then
      echo "Telegram Bot process died. Exiting container to force restart."
      exit 1
    fi
  fi

  sleep 5
done
