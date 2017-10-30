import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import appConfig from '@/config'
import {categoryApi} from '@/api'

const mock = new MockAdapter(axios)

describe('api category', () => {
    it('should get all categories', () => {
        const testCategories = [
            {name: 'category1'},
            {name: 'category2'},
            {name: 'category3'}
        ]
        mock.onGet(appConfig.apiUrl + '/taxons/').reply(200, testCategories)

        return categoryApi.getAllCategories()
            .then(response => {
                expect(response.data).to.deep.equal(testCategories)
            })
    })

    it('should get all category by code', () => {
        const testCategory = {name: 'category1'}
        const code = 'test1234'
        mock.onGet(appConfig.apiUrl + '/taxons/' + code + '?locale=' + appConfig.apiLocale).reply(200, testCategory)

        return categoryApi.getCategoryByCode(code)
            .then(response => {
                expect(response.data).to.deep.equal(testCategory)
            })
    })
})
