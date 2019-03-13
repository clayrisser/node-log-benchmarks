#!/bin/bash

export ITERATIONS=1000

npm run start -- winston:console $ITERATIONS
npm run start -- winston:console $ITERATIONS --appmetrics
# npm run json2csv -- winston.console.$ITERATIONS.json
# npm run json2csv -- winston.console.$ITERATIONS.appmetrics.json
