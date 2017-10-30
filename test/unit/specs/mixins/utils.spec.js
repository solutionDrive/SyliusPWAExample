import mixin from '@/mixins/utils'

const {getFormattedPrice} = mixin.methods

describe('mixin utils', () => {
    it('should get the formatted price', () => {
        const priceUSD = {
            currency: 'USD',
            current: 1234
        }
        expect(getFormattedPrice(priceUSD)).to.equal('$12.34')

        const priceEuro = {
            currency: 'Euro',
            current: 5678
        }
        expect(getFormattedPrice(priceEuro)).to.equal('56.78')
    })
})
