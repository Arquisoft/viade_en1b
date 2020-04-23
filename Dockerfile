FROM node
COPY . /viade_en1b
WORKDIR /viade_en1b
EXPOSE 3000
RUN mkdir -p viade_en1b/viade_en1b 
RUN npm install --loglevel=error && npm run build && cp -r build/* viade_en1b/viade_en1b
CMD ["node", "server.js"]