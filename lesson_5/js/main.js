const API = 'https://raw.githubusercontent.com/inviskahuna/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cart: [],
        imgCatalog: 'https://placehold.it/200x150',
        isVisibleCart: false,
        searchLine: "",
        showModal: false
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct (product) {
            console.log (product.title_p);
            this.cart.push(product);
        },
        searchProduct(){
            console.log(this.searchLine)
        }
    },
    mounted () {
        this.getJson (`${API + this.catalogUrl}`)
        .then (data => {
            for (el of data) {
                this.products.push (el)
            }
        })
    }
});

Vue.component('modal', {
    template: '#modal-template'
});
