
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//   //window.ActiveXObject() => let xhr = new ActiveXObject()
//     xhr.open('GET', url, true);
//
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log ('error');
//             } else {
//                 cb (xhr.responseText);
//             }
//         }
//     }
//     xhr.send ();
// };

class ProductsList {
    constructor(){
        this.products = [];
        this.allProducts = [];
        this.init();
    }
    init(){
        // this._fetchProducts(() => {
        //     this.render ();
        // });
        this._getProducts();
    }

    _getProducts () {
        fetch (`${API}/catalogData.json`)
            .then (result => result.json())
            .then (data => {
                this.products = [...data];
                this.render()
            })
            .catch (error => {
                console.log (error)
            })
    }
    // _fetchProducts (cb) {
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.products = JSON.parse(data);
    //         console.log (this.goods);
    //         cb ();
    //     })
    // } - не надо так
    // fetchProducts(){
    //     this.products = [
    //         {title: 'Notebook', price: 2000},
    //         {title: 'Mouse', price: 20},
    //         {title: 'Keyboard', price: 48},
    //         {title: 'Gamepad', price: 63},
    //         {title: 'Chair', price: 200},
    //     ];
    // }
    render(){
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render())
        })
    }
    sumPrice () {
        return this.allProducts.reduce ((accum, item) => accum += item.price, 0);
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                    </div>
                </div>`
    }
}


let products = new ProductsList();
console.log(products.sumPrice());

// const renderProduct = (title = 'Product', price, img = 'https://placehold.it/200x150') => {
//     return `<div class="product-item">
//                 <img src="${img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${title}</h3>
//                     <p>${price} $</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`
// };
//
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title, item.price));
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
//
//     for (let product of productsList){
//         document.querySelector('.products').insertAdjacentHTML('beforeend', product);
//     }
// };
//
// renderPage(products);


