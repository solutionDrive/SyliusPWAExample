import cart from '@/store/modules/cart'

const {initCartId, setCartId, setCart} = cart.mutations

describe('cart store module', () => {
    it('should init cart id', () => {
        const state = {cartid: ''}
        initCartId(state)

        expect(state.cartid).to.be.a('string').that.is.not.empty
    })

    it('should set cart id state', () => {
        const state = {cartid: ''}
        const testCartId = 'test'
        setCartId(state, testCartId)

        expect(state.cartid).to.equal(testCartId)
    })

    it('should set cart state', () => {
        const state = {cart: {}}
        const testCart = {
            name: 'testCart'
        }
        setCart(state, testCart)

        expect(state.cart).to.equal(testCart)
    })
})
