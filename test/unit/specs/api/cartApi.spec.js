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

    it('should get cart', () => {
        const cart = {name: 'test'}
        const cartId = 'testCart1234'
        mock.onGet(appConfig.apiUrl + '/carts/' + cartId).reply(200, cart)

        return cartApi.getCart(cartId)
            .then(response => {
                expect(response.data).to.deep.equal(cart)
            })
    })

})
