import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import appConfig from '@/config'
import {productApi} from '@/api'

describe('api/product', () => {
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

    it('should get list of product by the taxon code', () => {
        const testProductList = [
            {name: 'product1'},
            {name: 'product2'},
            {name: 'product3'}
        ]
        const testCode = 'testCategory1234'
        const query = {
            'channel': appConfig.apiChannel,
            'limit': appConfig.apiLimit,
            'page': 2
        }
        const queryString = Object.keys(query).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        }).join('&')

        mock.onGet(appConfig.apiUrl + '/taxon-products/' + testCode + '?' + queryString)
            .reply(200, testProductList)

        return productApi.getProductList(testCode, 2)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testProductList)
            })
    })

    it('should get product by the product code', () => {
        const testProduct = {name: 'product1'}
        const code = 'testProduct9876'
        mock.onGet(appConfig.apiUrl + '/products/' + code + '?channel=' + appConfig.apiChannel)
            .reply(200, testProduct)

        return productApi.getProduct(code)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testProduct)
            })
    })
})
