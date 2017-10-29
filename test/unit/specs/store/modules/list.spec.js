import list from '@/store/modules/list'

describe('list store module', () => {
    const mockProducts = ['product1', 'product2']
    const mockCategory = {name: 'mock'}

    it('should set products on the list', () => {
        const state = {products: []}
        list.mutations.setProducts(state, mockProducts)

        expect(state.products).to.equal(mockProducts)
    })

    it('should reset products on the list', () => {
        const state = {products: []}
        list.mutations.setProducts(state, mockProducts)
        list.mutations.resetProducts(state)

        expect(state.products).to.be.an('array').that.is.empty
    })

    it('should set current category', () => {
        const state = {category: {}}
        list.mutations.setCategory(state, mockCategory)

        expect(state.category).to.equal(mockCategory)
    })

    it('should reset current category', () => {
        const state = {category: {}}
        list.mutations.setCategory(state, mockCategory)
        list.mutations.resetCategory(state)

        expect(state.category).to.be.an('object').that.is.empty
    })
})
