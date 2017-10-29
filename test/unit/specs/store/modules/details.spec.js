import detail from '@/store/modules/detail'

const {setProduct, resetProduct} = detail.mutations

describe('detail store module', () => {
    const testProduct = {name: 'test'}

    it('should set product state', () => {
        const state = {product: {}}
        setProduct(state, testProduct)

        expect(state.product).to.equal(testProduct)
    })

    it('should reset product state', () => {
        const state = {product: {}}
        setProduct(state, testProduct)
        resetProduct(state)

        expect(state.product).to.be.an('object').that.is.empty
    })
})
