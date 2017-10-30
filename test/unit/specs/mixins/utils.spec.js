import mixin from '@/mixins/utils'

const {objectEmpty, getFormattedPrice} = mixin.methods

describe('mixin utils', () => {
    it('should check if object is empty', () => {
        expect(objectEmpty({})).to.equal(true)
        expect(objectEmpty({name: 'not emtpy'})).to.equal(false)
    })

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
