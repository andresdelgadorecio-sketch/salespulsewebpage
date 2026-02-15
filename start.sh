#!/bin/sh

# Start Next.js application in background
echo "Starting Next.js on port 5000..."
# Force port via env var inline AND node args if needed, though env usually works for standalone
PORT=5000 node server.js &
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
# Start Next.js application in background
echo "Starting Next.js on port 5000..."
HOSTNAME="0.0.0.0" PORT=5000 node server.js &
NEXT_PID=$!

# Start Telegram Bot in background
echo "Starting Telegram Bot..."
cd bot
if [ -z "$BOT_TOKEN" ]; then
  echo "ERROR: BOT_TOKEN is missing! Bot will not start."
else
  # Run bot in a subshell loop so it auto-restarts if it crashes
  (while true; do 
      echo "Launching Bot..."
      node index.js
      echo "Bot crashed or stopped. Restarting in 5 seconds..."
      sleep 5
  done) &
fi

# Monitor loop - ONLY check Next.js. If the website dies, the container dies.
# We no longer kill the container if the bot dies.
while true; do
  if ! kill -0 $NEXT_PID > /dev/null 2>&1; then
    echo "Next.js process died. Exiting container."
    exit 1
  fi
  sleep 10
done
