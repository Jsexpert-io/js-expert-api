# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
# First Stage : to install and build dependences

FROM node:20-alpine AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm config set registry https://registry.npmjs.org/

RUN  npm install  --verbose -f
COPY . .
RUN npx prisma generate
RUN npm run build 


# Second Stage : Setup command to run your app using lightweight node image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
RUN ls
CMD ["npm","run", "start:prod"]