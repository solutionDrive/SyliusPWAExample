import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import appConfig from '@/config'
import {categoryApi} from '@/api'

const mock = new MockAdapter(axios)

describe('api category', () => {
    it('should get all categories', () => {
        const mockCategories = [
            {name: 'category1'},
            {name: 'category2'},
            {name: 'category3'}
        ]
        mock.onGet(appConfig.apiUrl + '/taxons/').reply(200, mockCategories)

        return categoryApi.getAllCategories()
            .then(response => {
                expect(response.data).to.deep.equal(mockCategories)
            })
    })
})
