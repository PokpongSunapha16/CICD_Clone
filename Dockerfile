
FROM node:22
WORKDIR /app

# ติดตั้ง postgres client (มี pg_isready, psql)
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npx prisma generate

# คัดลอก entrypoint script เข้า image
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "run", "dev"]

# COPY ./docker-entrypoint.sh /docker-entrypoint.sh

# ENTRYPOINT ["/docker-entrypoint.sh"]