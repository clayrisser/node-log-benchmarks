#!/bin/bash

export ITERATIONS=1000000

npm run start -- winston:console $ITERATIONS
npm run start -- winston:console $ITERATIONS --appmetrics
