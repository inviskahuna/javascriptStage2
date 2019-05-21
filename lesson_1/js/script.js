"use strict";

const products = [
    {title_p: 'Notebook', price_p: 2000, sign_p: 'Ноутбук-утюг, 12 ядер, 200вт, пассивное охлаждение', img_p: 'image/notebook.png', link_p: '#'},
    {title_p: 'PC', price_p: 4000, sign_p: 'Бюджетный компьютер', img_p: 'image/pc.png', link_p: '#'},
    {title_p: 'Mouse', price_p: 10, sign_p: 'Мышь для работы в рукавицах', img_p: 'image/mouse.png', link_p: '#'},
    {title_p: 'Keyboard', price_p: 20, sign_p: 'Пылевлагозащитная клавиатура', img_p: 'image/keyboard.png', link_p: '#'},
    {title_p: 'Display', price_p: 1000, sign_p: '4k монитор, отлично подходит для учебы', img_p: 'image/display.png', link_p: '#'}
];

const renderProduct = (title_p='Product', price_p, sign_p, img_p, link_p) => {
    return `<div class="product-item small">
                <div class="card text-center m-1 mt-3" style="width: 18rem; min-height: 20rem;">
                    <a href="#"><img class="card-img-top mt-2" src=${img_p} alt="${title_p}"></a>
                    <div class="card-body">
                        <h4 class="card-title">${title_p}</h4>
                        <h6 class="card-text text-danger">${price_p} $</h6>
                    </div>
                    <p class="card-text">${sign_p}</p>
                    <a href="${link_p}" class="btn btn-primary">В корзину</a>
                </div>
            </div>`
};

const renderPage = list => {
    const productList = list.map(item => renderProduct(item.title_p, item.price_p, item.sign_p, item.img_p, item.link_p));
    console.log(productList);
    document.querySelector('.products').innerHTML = productList.join('');
};

renderPage(products);
