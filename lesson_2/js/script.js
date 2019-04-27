"use strict";

const products = [
    {
        title_p: 'Notebook',
        price_p: 2000,
        sign_p: 'Ноутбук-утюг, 12 ядер, 200вт, пассивное охлаждение',
        img_p: 'image/notebook.png',
        count_p: 0,
        link_p: '#'
    },
    {
        title_p: 'PC',
        price_p: 4000,
        sign_p: 'Бюджетный компьютер',
        img_p: 'image/pc.png',
        count_p: 0,
        link_p: '#'
    },
    {
        title_p: 'Mouse',
        price_p: 10,
        sign_p: 'Мышь для работы в рукавицах',
        img_p: 'image/mouse.png',
        count_p: 0,
        link_p: '#'
    },
    {
        title_p: 'Keyboard',
        price_p: 20,
        sign_p: 'Пылевлагозащитная клавиатура',
        img_p: 'image/keyboard.png',
        count_p: 0,
        link_p: '#'
    },
    {
        title_p: 'Display',
        price_p: 1000,
        sign_p: '4k монитор, отлично подходит для учебы',
        img_p: 'image/display.png',
        count_p: 0,
        link_p: '#'
    }
];

class GoodsItem {
    constructor(title, price, sign, img, link) {
        this.title_p = title;
        this.price_p = price;
        this.sign_p = sign;
        this.img_p = img;
        this.link_p = link;
    }

    render() {
        return `<div class="product-item small">
                <div class="card text-center m-1 mt-3" style="width: 18rem; min-height: 20rem;">
                    <a href="#"><img class="card-img-top mt-2" src=${this.img_p} alt="${this.title_p}"></a>
                    <div class="card-body">
                        <h4 class="card-title">${this.title_p}</h4>
                        <h6 class="card-text text-danger">${this.price_p} $</h6>
                    </div>
                    <p class="card-text">${this.sign_p}</p>
                    <input type="button" value="В корзину" class="btn btn-primary" 
                    OnClick="user.addItem('${this.title_p}', '${this.price_p}')"> 
                </div>
            </div>`;
    }
}

// ${this.title_p}, ${this.price_p}
// user.addItem('test', 120)"
class GoodsList { // for render all goods at main page
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = products
    }

    calcSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price_p
        });
        console.log(`Sum of goods list is ${sum}`)
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title_p, good.price_p, good.sign_p, good.img_p, good.link_p);
            listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}


class BasketItem {
    constructor(title, price, count, number) {
        this.title_p = title;
        this.price_p = price;
        this.count_p = count;
        this.number = number;
        this.sum_p = count * price;
    }

    render() {
        return `
        <tr>
            <th scope="row">${this.number}</th>
            <td>${this.title_p}</td>
            <td>${this.price_p}</td>
            <td>${this.count_p}</td>
            <td>${this.sum_p}</td>
        </tr>
        `;
    }
}

class userBasket {
    constructor() {
        this.items = [];
        this.number = 1;
    }


    addItem(title, price) {
        let number = this.number;
        const isExist = (this.items.filter(i => i.title === title));
        if (isExist.length === 0) {
            let count = 1;
            number = this.number++;
            this.items.push({title, price, count, number});
        } else {
            isExist[0].count++;
        }
    }

    render() {
        let listHtml = '';
        this.items.forEach(item => {
            const goodItem = new BasketItem(item.title, item.price, item.count, item.number);
            listHtml += goodItem.render();
        });
        document.querySelector('.user_basket').innerHTML = listHtml;
    }
}

const user = new userBasket();
const list = new GoodsList();
list.fetchGoods();
list.render();
list.calcSum();


