import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'

const gql = '/graphql'
const CUSTOMER_EMAIL = 'vibin2joby@gmail.com'
const CUSTOMER_FULL_NAME = 'vibinjoby'
const CUSTOMER_PASSWORD = 'PASSWORD123'

const OWNER_EMAIL = 'chinchuv@gmail.com'
const OWNER_FULL_NAME = 'chinchuvargh'
const OWNER_PASSWORD = 'PASSWORD123'

const RESTAURANT_NAME = 'MOCK_RESTAURANT'
const RESTAURANT_ADDRESS = 'MOCK_ADDRESS'
const RESTAURANT_CONTACT_NUMBER = 1236581774

describe('AppController (e2e)', () => {
  let app: INestApplication
  let customerToken: string
  let ownerToken: string
  let restaurantId: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe(gql, () => {
    it('should create a new owner account', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {createUser(createUserInput: { email: "${OWNER_EMAIL}", password:"${OWNER_PASSWORD}",fullName:"${OWNER_FULL_NAME}",userType:owner}) { id fullName email}}`,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.createUser).toEqual({
            id: res.body.data.createUser.id,
            fullName: OWNER_FULL_NAME,
            email: OWNER_EMAIL,
          })
        })
    })

    it('should login as a owner', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {login(data:{email:"${OWNER_EMAIL}", password:"${OWNER_PASSWORD}",userType:owner}){ token }}`,
        })
        .expect(200)
        .expect(res => {
          ownerToken = res.body.data.login.token // Add the id to the global variable
        })
    })

    it('should create a new customer', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {createUser(createUserInput: { email: "${CUSTOMER_EMAIL}", password:"${CUSTOMER_PASSWORD}",fullName:"${CUSTOMER_FULL_NAME}",userType:customer}) { id fullName email}}`,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.createUser).toEqual({
            id: res.body.data.createUser.id,
            fullName: CUSTOMER_FULL_NAME,
            email: CUSTOMER_EMAIL,
          })
        })
    })

    it('should login the newly created customer', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation{login(data:{email:"${CUSTOMER_EMAIL}",password:"${CUSTOMER_PASSWORD}",userType:customer}){token}}`,
        })
        .expect(200)
        .expect(res => {
          customerToken = res.body.data.login.token
        })
    })

    it('should create a new restaurant by owner', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set('Authorization', 'Bearer ' + ownerToken)
        .send({
          query: `mutation{createRestaurant(createRestaurantInput:{restaurantName:"${RESTAURANT_NAME}",address:"${RESTAURANT_ADDRESS}",contactNumber:${RESTAURANT_CONTACT_NUMBER}}){
            id
            restaurantName
            address
            contactNumber
        }}`,
        })
        .expect(200)
        .expect(res => {
          restaurantId = res.body.data.createRestaurant.id
          expect(res.body.data.createRestaurant).toEqual({
            id: restaurantId,
            restaurantName: RESTAURANT_NAME,
            address: RESTAURANT_ADDRESS,
            contactNumber: RESTAURANT_CONTACT_NUMBER,
          })
        })
    })

    it('should create a new review by customer', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          query: `mutation{createReview(createReviewInput:{ratings:2,visitDate:"${new Date()}",comments:"average restaurant",restaurantId:${restaurantId}}){
            ratings 
            comments
          }
        }`,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.createReview).toEqual({
            ratings: 2,
            comments: 'average restaurant',
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

    it('should get an error for no authorization', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({ query: '{user(id:500){fullName userType email}}' })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBe(null)
          expect(res.body.errors[0].message).toBe('Authorization header not found.')
        })
    })
  })
})
