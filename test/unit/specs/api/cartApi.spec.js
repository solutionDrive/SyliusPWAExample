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

    it('should pick up a cart', () => {
        const data = new FormData()
        data.append('channel', appConfig.apiChannel)
        const cartId = 'testCart9876'
        mock.onPost(appConfig.apiUrl + '/carts/' + cartId, data).reply(201)

        return cartApi.pickUpCart(cartId)
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
        const cartId = 'testCart9876'
        const cartResponse = {item: 'testCartItem'}
        mock.onPost(appConfig.apiUrl + '/carts/' + cartId + '/items', data).reply(201, cartResponse)

        return cartApi.addToCart(cartId, productCode, quantity, variantCode)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.data).to.deep.equal(cartResponse)
            })
    })

    it('should get the cart', () => {
        const testCart = {name: 'test'}
        const cartId = 'testCart1234'
        mock.onGet(appConfig.apiUrl + '/carts/' + cartId).reply(200, testCart)

        return cartApi.getCart(cartId)
            .then(response => {
                expect(response.data).to.deep.equal(testCart)
            })
    })
})
