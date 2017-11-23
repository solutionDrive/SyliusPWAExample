import axios from 'axios'
import appConfig from '@/config'

export default {
    /**
     * @param slug
     * @returns {AxiosPromise}
     */
    getBySlug (slug) {
        return axios.get(appConfig.apiUrl + '/product-reviews-by-slug/' + slug + '?channel=' + appConfig.apiChannel)
    },

    /**
     * @param slug
     * @param title
     * @param rating
     * @param comment
     * @param email
     * @returns {AxiosPromise}
     */
    addBySlug (slug, title, rating, comment, email) {
        const data = {
            channelCode: appConfig.apiChannel,
            title,
            rating: parseInt(rating),
            comment,
            email
        }

        return axios.post(appConfig.apiUrl + '/product-reviews-by-slug/' + slug, data)
    }
}
