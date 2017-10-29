import list from '@/store/modules/list'

describe('list store module', () => {
    it('should set products', () => {
        const state = {products: []}
        const mockProducts = ['product1', 'product2']
        list.mutations.setProducts(state, mockProducts)

        expect(state.products).to.equal(mockProducts)
    })
})
