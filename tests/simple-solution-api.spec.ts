import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { ProductDto } from '../dto/product-dto'

const BASE_URL = 'https://backend.tallinn-learning.ee/products'

test('product creation with correct data should create a new product', async ({ request }) => {
  // prepare request body
  const requestBody = new ProductDto('DtoLaptop', 10400)

  // define header for X-Api-Key
  //   -H 'X-API-Key: my-secret-api-key' \
  const header = {
    'X-Api-Key': 'my-secret-api-key',
  }
  // Send a POST request to the server
  const response = await request.post(BASE_URL, {
    headers: header,
    data: requestBody,
  })
  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  expect(statusCode).toBe(StatusCodes.OK)
})

test('should reply 401 on invalid api-key', async ({ request }) => {
  // prepare request body
  const requestBody = new ProductDto('DtoLaptop', 10400)

  // define header for X-Api-Key
  //   -H 'X-API-Key: my-secret-api-key' \
  const header = {
    'X-Api-Key': 'my-secret-api-key-invalid-api-key',
  }
  // Send a POST request to the server
  const response = await request.post(BASE_URL, {
    headers: header,
    data: requestBody,
  })
  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  expect(statusCode).toBe(StatusCodes.UNAUTHORIZED)
})
