#Base image taken from:https://github.com/cypress-io/cypress-docker-images
FROM cypress/browsers:node14.17.0-chrome91-ff89
#Create the folder where our project will be stored
RUN mkdir /mvcTestsinDocker
#We make it our workdirectory
WORKDIR /mvcTestsinDocker
#Let's copy the essential files that we MUST use to run our scripts.
COPY ./package.json .
COPY ./cypress.json .
COPY ./cypress ./cypress
COPY ./generate-html-from-cucumber-json.js .
#Install the cypress dependencies in the work directory
RUN npm install
#Executable commands the container will use[Exec Form]
ENTRYPOINT ["npx","./node_modules/.bin/cypress","run"]
#With CMD in this case, we can specify more parameters to the last entrypoint.
CMD [""]