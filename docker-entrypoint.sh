#!/bin/sh
set -e

echo "⏳ Waiting for Postgres..."
until pg_isready -h db -U admin -d ubonhooper; do
  sleep 2
done

echo "🚀 Running Prisma migrations..."
npx prisma migrate dev --name init

echo "🌱 Running create_account..."
npm run create_account

echo "✅ Ready! Starting Next.js..."
exec "$@"
