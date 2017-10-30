import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import appConfig from '@/config'
import {cartApi} from '@/api'

describe('api/cart', () => {
    // @todo need a better way to deal with mock for all the api tests
    let mock

    before(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.reset()
    })

    after(() => {
        mock.restore()
    })

    const testCartId = 'testCart9876'
    const testCartResponse = {item: 'testCartItem'}

    it('should pick up a cart', () => {
        const data = new FormData()
        data.append('channel', appConfig.apiChannel)
        mock.onPost(appConfig.apiUrl + '/carts/' + testCartId, data).reply(201)

        return cartApi.pickUpCart(testCartId)
            .then(response => {
                expect(response.status).to.equal(201)
            })
    })

    it('should add products to the cart', () => {
        const productCode = 'testProduct1234'
        const quantity = 2
        const variantCode = 'testVariant5678'
        const data = {
            productCode,
            quantity,
            variantCode
        }
        mock.onPost(appConfig.apiUrl + '/carts/' + testCartId + '/items', data).reply(201, testCartResponse)

        return cartApi.addToCart(testCartId, productCode, quantity, variantCode)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.data).to.deep.equal(testCartResponse)
            })
    })

    it('should get the cart', () => {
        mock.onGet(appConfig.apiUrl + '/carts/' + testCartId).reply(200, testCartResponse)

        return cartApi.getCart(testCartId)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCartResponse)
            })
    })
})
