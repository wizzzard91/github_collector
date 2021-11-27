# Inspired by "docker node.js best practices":
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
FROM node:16.13.0-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/github_collector
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD "npm" "start"
