#!/bin/sh

echo '==============================================='
echo 'Check node and npm version'
echo '==============================================='
echo ''

node -v
npm -v

echo ''
echo '==============================================='
echo 'Installing project packages'
echo '==============================================='
echo ''

npm i --no-optional

echo ''
echo '==============================================='
echo "Executing environment ${ENVIRONMENT}"
echo '==============================================='
echo ''

if [ "${ENVIRONMENT}" = 'dev' ]; then
  npm run start:dev
else
  npm run prebuild
  npm run build
  npm run start:prod
fi
