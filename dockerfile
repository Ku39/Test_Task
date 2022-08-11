FROM node

COPY . .

EXPOSE 8000

CMD ["node", "./back/index.js"]