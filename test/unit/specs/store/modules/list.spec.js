import list from '@/store/modules/list'

const {setProducts, resetProducts, setCategory, resetCategory} = list.mutations

describe('list store module', () => {
    const testProducts = ['product1', 'product2']
    const testCategory = {name: 'test'}

    it('should set products on the list', () => {
        const state = {products: []}
        setProducts(state, testProducts)

        expect(state.products).to.equal(testProducts)
    })

    it('should reset products on the list', () => {
        const state = {products: []}
        setProducts(state, testProducts)
        resetProducts(state)

        expect(state.products).to.be.an('array').that.is.empty
    })

    it('should set current category', () => {
        const state = {category: {}}
        setCategory(state, testCategory)

        expect(state.category).to.equal(testCategory)
    })

    it('should reset current category', () => {
        const state = {category: {}}
        setCategory(state, testCategory)
        resetCategory(state)

        expect(state.category).to.be.an('object').that.is.empty
    })
})
