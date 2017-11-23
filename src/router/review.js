const ReviewIndex = () => import('@/views/pages/detail/review/Review')
const ReviewCreate = () => import('@/views/pages/detail/review/ReviewCreate')

export default {
    routes: [
        {
            path: '/detail/:slug/review',
            name: 'review-index',
            component: ReviewIndex
        },
        {
            path: '/detail/:slug/review/new',
            name: 'review-create',
            component: ReviewCreate
        }
    ]
}
