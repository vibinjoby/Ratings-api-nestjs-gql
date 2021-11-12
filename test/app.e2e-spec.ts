import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'

const gql = '/graphql'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let lastCreatedUserId: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe(gql, () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            'mutation {createUser(createUserInput: { email: "chinchuv93@gmail.com", password:"Vibinjoby123",fullName:"chinchuvarghese",userType:customer}) { id fullName email}}',
        })
        .expect(200)
        .expect(res => {
          lastCreatedUserId = res.body.data.createUser.id // Add the id to the global variable
          expect(res.body.data.createUser).toEqual({
            id: res.body.data.createUser.id,
            fullName: 'chinchuvarghese',
            email: 'chinchuv93@gmail.com',
          })
        })
    })

    it('should find the recently created user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({ query: `{user(id:${lastCreatedUserId}){fullName userType email}}` })
        .expect(200)
        .expect(res => {
          expect(res.body.data.user).toEqual({
            fullName: 'chinchuvarghese',
            userType: 'customer',
            email: 'chinchuv93@gmail.com',
          })
        })
    })

    // TO-DO:- uncomment this once adding admin token to header
    // This should be possible only for admin
    /* it('should delete the last created user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({ query: `mutation { removeUser(id:${lastCreatedUserId})}` })
        .expect(200)
    }) */

    it('should get an error for bad id', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({ query: '{user(id:500){fullName userType email}}' })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBe(null)
          expect(res.body.errors[0].message).toBe('No user with id 500 found')
        })
    })
  })
})
