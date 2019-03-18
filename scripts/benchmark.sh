#!/bin/bash

export ITERATIONS=$1

npm run start -- winston:console $ITERATIONS --appmetrics
npm run start -- log4js:console $ITERATIONS --appmetrics
npm run start -- bunyan:console $ITERATIONS --appmetrics

npm run start -- winston:filesystem $ITERATIONS --appmetrics
npm run start -- log4js:filesystem $ITERATIONS --appmetrics
npm run start -- bunyan:filesystem $ITERATIONS --appmetrics

npm run start -- winston:syslog $ITERATIONS --appmetrics
npm run start -- log4js:syslog $ITERATIONS --appmetrics
npm run start -- bunyan:syslog $ITERATIONS --appmetrics
