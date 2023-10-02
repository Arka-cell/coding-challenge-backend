const axios = require('axios')

const getRandomMasterCards = async () => {
    const randomCardApiUrl = 'https://random-data-api.com/api/v2/credit_cards?size=50'
    const response = await axios.get(randomCardApiUrl)
    // eslint-disable-next-line array-callback-return
    const data = response.data.filter(item => {
        if (item.credit_card_type === 'visa') {
            const creditCardDigits = item.credit_card_number
            const lastDigits = creditCardDigits.slice(-4)
            const anonymizedCCNumber = '****-****-****-' + lastDigits
            item.credit_card_number = anonymizedCCNumber
            return {
                ...item
            }
        }
    })
    if (data.length === 0) {
        /* NOTE: due to randomness, we're handling a probability case where
        type mastercard isn't fetched with a recursive function */
        getRandomMasterCards()
    }
    return data
}

module.exports = { getRandomMasterCards }
