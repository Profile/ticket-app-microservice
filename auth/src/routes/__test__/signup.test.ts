import request from "supertest";
import { app } from "../../app";

it('Should return a 201 status on successful signup', async () => {
    return request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'example@test.com',
            password: '123456'
        })
        .expect(201);
});
