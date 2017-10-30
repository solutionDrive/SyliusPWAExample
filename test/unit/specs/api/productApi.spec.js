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
        const productList = [
            {name: 'product1'},
            {name: 'product2'},
            {name: 'product3'}
        ]
        const code = 'testCategory1234'
        mock.onGet(appConfig.apiUrl + '/taxon-products/' + code + '?channel=' + appConfig.apiChannel)
            .reply(200, productList)

        return productApi.getProductList(code)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(productList)
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
