const request = require('supertest');
const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const db = require('./db');

const MAINAPI_URL = "http://localhost:5000";


const util = require('../util');


// const token = util.token({ _id: })


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


async function createdUser(dtoValues) {
    const response = await request(MAINAPI_URL)
    .post(`/api/v1/user/reg`)
    .send(dtoValues);

    return response;
}


describe('tsets', () => {

    describe('Registration The User', () => {
        it('it should cereate a user', async() => {
            const randomValues = getRandomValues();

            const response = await request(MAINAPI_URL)
            .post(`/api/v1/user/reg`)
            .send({
                name: randomValues.string,
                email: randomValues.email,
                password: randomValues.password
            });

            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBeFalsy();
            expect(typeof response.body.error).toBe('boolean');
            expect(response.body.result).toBeDefined();
            expect(response.body.result.name == randomValues.string).toBeTruthy();
            expect(response.body.result.email == randomValues.email).toBeTruthy();
        });

        it('it should fail if user is already exists', async() => {
            const userDto = getRandomValues();

            await request(MAINAPI_URL)
            .post(`/api/v1/user/reg`)
            .send({
                name: userDto.string,
                email: userDto.email,
                password: userDto.password
            });

            const response = await request(MAINAPI_URL)
            .post(`/api/v1/user/reg`)
            .send({
                name: userDto.string,
                email: userDto.email,
                password: userDto.password
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeDefined();
            expect(typeof response.body.error).toBe('boolean');
            expect(typeof response.body.error).toBeTruthy();
        });
    });

    describe('Update User Credentials', () => {
        it.skip('it should update the user', async() =>{
            const randomValues = getRandomValues();
            await createdUser({
                name: randomValues.string,
                email: randomValues.email,
                password: randomValues.password
            });
            
            const updateuserDto = getRandomValues();
            // console.log(updateuserDto)
            const response = await request(MAINAPI_URL)
            .patch(`/api/v1/user/update`)
            .send({
                name: updateuserDto.string,
                email: randomValues.email,
                password: updateuserDto.password
            });
            // console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.result).toBeDefined();
            expect(response.body.result.name == updateuserDto.string).toBeTruthy();
            expect(response.body.result.password == updateuserDto.password).toBeTruthy();
        });

        it('it should fail if user is does not exists', async() => {
            const userDto = getRandomValues();

            const response = await request(MAINAPI_URL)
            .patch('/api/v1/user/update')
            .send({
                name: userDto.string,
                email: userDto.email,
                password: userDto.password
            });
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBeTruthy();
        });
    });

    describe('Delete The User', () => {
        it.skip('it should delete the user', async() => {
            const userDto = getRandomValues();
            const user = await createdUser({
                name: userDto.string,
                email: userDto.email,
                password: userDto.password
            });

            const id = user.body.result._id;

            const response = await request(MAINAPI_URL)
            .delete(`/api/v1/user/delete/${id}`)
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(typeof response.body.error).toBe('boolean');
            expect(response.body.error).toBeFalsy();
        });

        it('it should fail if user is does not exists', async() => {
            const id = new mongoose.Types.ObjectId().toHexString();
            
            const response = await request(MAINAPI_URL)
            .delete(`/api/v1/user/delete/${id}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(typeof response.body.error).toBe('boolean');
            expect(response.body.error).toBeTruthy();
        });
    });

    describe('Login The User', () => {
        it.skip('it should login with user credentials', async() => {
            const userDto = getRandomValues();

            const user = await createdUser({
                name: userDto.string,
                email: userDto.email,
                password: userDto.password
            });

            const response = await request(MAINAPI_URL)
            .post(`/api/v1/user/login`)
            .send({
                email: userDto.email,
                password: userDto.password
            });
            
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBeFalsy();
        });

        it('it should fail if email and password is incorrect', async() => {
            const userDto = getRandomValues();
            const response = await request(MAINAPI_URL)
            .post(`/api/v1/user/login`)
            .send({
                email: userDto.email,
                password: userDto.password
            });

            expect(response.statusCode).toBe(400);
            expect(response.body).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(response.body.error).toBeTruthy();
        });
    });

    describe('logout', () => {
        it('it should logout', async() => {

            const response = await request(MAINAPI_URL)
            .get(`/api/v1/user/logout`)

            // console.log(response);
            // console.log(response.body);
        });
    });

    describe('Get User', () => {

        const util = require('../util');
        const User = require('../models/userSchema');
        it.skip('it should get the user', async() => {

            const userDto = getRandomValues();

            // const token = jwt.sign({ _id: })

            const user = await User.create({
                name: userDto.string,
                email: userDto.email,
                password: userDto.password
            });
            
            const token = await util.token(user);
            console.log(token);
            
            const response = await request(MAINAPI_URL)
            .get(`/api/v1/userId`)
            .set('token', token)
            
            console.log(response);
            console.log(response.statusCode);

        });
    });

    describe('Get All Users', () => {

        const jwt = require('jsonwebtoken');
        const Admin = require('../models/admin');

        it.skip('it should getAll users', async() =>{

            const adminDto = getRandomValues();
            const admin = await Admin.create({
                name: adminDto.string,
                email: adminDto.email,
                password: adminDto.password
            });

            console.log(admin);

            const response = await request(MAINAPI_URL)
            .get(`/api/v1/all`)
            .send({
                name: adminDto.string,
                email: adminDto.email,
                password: adminDto.password
            });

            console.log(response);
            console.log(response.body);
            console.log(response.statusCode);
        });
    });
});