
const request = require('supertest');
let server = require('../../index');

test('Integration Tests - Application Test 1 - Get All Applications', async () => {

    const res = await request(server).get('/applications');

    expect(res.status).toBe(200);

});

server.close();
