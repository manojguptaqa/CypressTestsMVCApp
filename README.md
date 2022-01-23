# How to Run Tests

## Installation

```bash
npm install
```

## Run Tests locally

Run tests in a headed chrome browser

```bash
npm run triggerAllTests-headed-chrome
```
Run tests in a headless Electron browser

```bash
npm run triggerAllTests-headless
```
Run tests in a headless Chrome browser

```bash
npm run triggerAllTests-headless-chrome
```

## Docker Commands

Pull docker image
```bash
docker pull manojguptaqa/mvc-cypress-test:latest
```

## Run Tests inside a docker container

Run tests in a headed chrome browser

```bash
cmd="npm run triggerAllTests-headed-chrome" docker-compose up
```
Run tests in a headless Electron browser

```bash
cmd="npm run triggerAllTests-headless" docker-compose up
```
Run tests in a headless Chrome browser

```bash
cmd="npm run triggerAllTests-headless-chrome" docker-compose up
```


