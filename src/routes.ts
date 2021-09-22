
import Router from 'koa-router';
import config from './config';
import controller = require('./application/index');
const koaBody = require('koa-body');

const routes = new Router();

routes.get(`/${config.apiPrefix}/health/ping`, controller.health.ping);
routes.post('/api/message', controller.message.receiveMessage);

// Fetch the messages that arrived between two given dates.
routes.post(`/${config.apiPrefix}/filter/dates`, controller.message.filterByDates)
// Fetch the messages from a given Alien leader
routes.post(`/${config.apiPrefix}/filter/leader`, controller.message.filterByAlienLeader)
// Fetch the messages from a given Type (INFO, DANGER, WARNING)
routes.post(`/${config.apiPrefix}/filter/type`, controller.message.filterByType)
// Fetch by invalid / valid messages (If invalid, state why is it invalid).
routes.post(`/${config.apiPrefix}/filter/state`, controller.message.fetchByValid)

export default routes;
