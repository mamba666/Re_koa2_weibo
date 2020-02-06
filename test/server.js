/**
 * @description jest server
 * @author edison
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
