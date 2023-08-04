
const request = require('supertest');
let server;
const config = require('config');
const DB_Conn = require(`../../../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../../../resources/constants');

beforeEach(() => { server = require('../../../index'); });
afterEach(() => { server.close(); });

test('Integration Tests - Application Test 1 - Get All Applications', async () => {

    const res = await request(server).get('/applications');

    expect(res.status).toBe(200);

    expect(res.body.length).toBeGreaterThanOrEqual(0);
    
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('description');

});

test('Integration Tests - Application Test 2 - Get Application by Id', async () => {

    const res = await request(server).get('/applications/1');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('description');

    if (DB_Conn === Constants.DB_CONNS_PG) expect(res.body[0]).toMatchObject({'id': 1});
    if (DB_Conn === Constants.DB_CONNS_MONGO) expect(res.body[0]).toMatchObject({'_id': 1});

});