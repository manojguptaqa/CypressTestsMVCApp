FROM cypress/included:9.3.1
# Copy NPM & Install
COPY ./package.json /tmp/package.json
# CI=true is used to suppress an exorbitant amount of verbose console outputs during the cypress installation
RUN cd /tmp && CI=true npm install
RUN CI=true /tmp/node_modules/.bin/cypress install
RUN mkdir -p /e2e && cp -a /tmp/node_modules /e2e/

WORKDIR /e2e
# Copy files for config
COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
COPY ./package.json .
COPY ./generate-html-from-cucumber-json.js .
ENTRYPOINT [""]