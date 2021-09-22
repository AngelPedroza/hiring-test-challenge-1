/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const DangerMessages = require('./DangerMessages.json');
const WarningMessages = require('./WarningMessages.json')
const InfoMessages = require('./InfoMessages.json')
const InvalidWords = require('./InvalidWords.json')

const basePath = 'http://localhost:3000/api';

async function callEndpoint(method, url, headers, data) {
  try {
    await axios({
      method: method, url: `${basePath}${url}`, headers: {'Content-Type': 'application/json'}, data: {'msg': data}
    });
  } catch (e) {
    console.log(`❌ Error calling ${url}:\n \x1b[31m${JSON.stringify(e)}\n\n \x1b[0m`);
  }
}

async function loadMessages() {
  const url = '/message';

  for (let i = 0; i < InvalidWords.length; i += 1) {
    const message = InvalidWords[i];
    try {
      await callEndpoint('post', url, {}, message);
      console.log('\x1b[32m', '✅ messages sent. \x1b[0m');
    } catch (e) {
      console.log('\x1b[32m', '❌ messages not sent. \x1b[0m', e);
    }
  }
}

async function loadFixtures() {
  await loadMessages();
}

loadFixtures();
