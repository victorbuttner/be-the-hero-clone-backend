# Etapa 1: Ambiente de desenvolvimento
FROM node:20-slim

# Diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar apenas os arquivos de dependência
COPY package*.json ./

# Instalar dependências com suporte ao desenvolvimento
RUN yarn install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta padrão da aplicação
EXPOSE 3000

# Comando para rodar o servidor em desenvolvimento
CMD ["yarn", "start"]

