import detail from '@/store/modules/detail'

const {setProduct, resetProduct} = detail.mutations

describe('detail store module', () => {
    const mockProduct = {name: 'mock'}

    it('should set product state', () => {
        const state = {product: {}}
        setProduct(state, mockProduct)

        expect(state.product).to.equal(mockProduct)
    })

    it('should reset product state', () => {
        const state = {product: {}}
        setProduct(state, mockProduct)
        resetProduct(state)

        expect(state.product).to.be.an('object').that.is.empty
    })
})
