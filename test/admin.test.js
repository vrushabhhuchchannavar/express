const request = require('supertest');
const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');


const db = require('./db');

const MAINAPI_URL = "http://localhost:5000";


beforeAll(async() => {
    await db.connect();
 });
 
 afterAll(async () => {
     await mongoose.connection.close();
 });

 function getRandomValues() {
    return {
        string: crypto.randomBytes(10).toString('hex'),
        email: `${crypto.randomBytes(4).toString('hex')}@gmail.com`,
        password: `${_.random(1000, 9999)}`
    }
}


describe('admin test', () => {

    describe('create admin', () => {

        it.skip('it should search for the user', async() => {
            const dtoValues = getRandomValues();
            const response = await request(MAINAPI_URL)
            .post(`/api/v1/`)
            .send({
                name: dtoValues.string,
                email: dtoValues.email,
                password: dtoValues.password
            });

            // console.log(response);
            // console.log(response.body);
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBeFalsy();
            expect(typeof response.body.error).toBe('boolean');
        });
    });
});