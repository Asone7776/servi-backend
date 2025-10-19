FROM node:21-alpine

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем остальной код
COPY . .

RUN pnpm prisma generate
# Собираем проект
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
