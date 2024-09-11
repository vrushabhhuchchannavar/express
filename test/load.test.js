const request = require('supertest');
const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');
const axios = require('axios');


const jwt = require('jsonwebtoken');

const db = require('./db');

const MAINAPI_URL = "http://localhost:5000";


        const url = ['http://localhost:5000/user/reg']; // Replace with your API paths
        const requests = axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/user/reg',
            data: {
                name: '2c8ba9ae8b333f1138fo',
                email: '2c8bz@gmail.com',
                password: '1246'
            }
        }).then((res) => {
            console.log('error', res)
        }).catch((err) => {
            console.log('error:', err);
        }); 
    
        const responses = Promise.all(requests);
        // console.log('responses:', responses)
        expect(responses.statusCode).toBe(201)
        // expect(responses.every(response => response.ok)).toBeTruthy(); // Check all responses are OK



        // https://test.ecobillz.com/api/settings/terminal/v1/terminal

