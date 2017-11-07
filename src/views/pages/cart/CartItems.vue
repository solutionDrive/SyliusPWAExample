<template>
    <div class="table">
        <thead>
        <tr>
            <th>item</th>
            <th><abbr title="unit price">unit price</abbr></th>
            <th><abbr title="quantity">Qty</abbr></th>
            <th>&nbsp;</th>
            <th>total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.items">
            <td>
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img :src="imageUrl + item.product.images[0].path"
                                 :alt="item.product.name"
                            >
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <router-link :to="{name: 'detail', params: {slug: item.product.slug}}">
                                {{ item.product.name }}
                            </router-link>
                            <p><small>{{item.product.code}}</small></p>
                            <p><small>{{item.product.variants[0].axis[0]}}</small></p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {{item.product.variants[0].price.current / 100 + cart.currency}}
            </td>
            <td>
                <input class="input" type="number" v-model="item.quantity">
            </td>
            <td><a class="delete" @click="removeItem(item.id)"></a></td>
            <td>{{item.total / 100 + cart.currency}}</td>
        </tr>
        </tbody>
    </div>
</template>

<script>
    export default {
        name: 'cart-items'
    }
</script>