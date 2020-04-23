FROM node
COPY . /viade_en1b
WORKDIR /viade_en1b
EXPOSE 3000
RUN npm install --loglevel=error
CMD ["npm", "start"]
