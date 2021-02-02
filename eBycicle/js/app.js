const BASE_URL = `http://localhost:1337`;

const UP = `/uploads/`;

async function loadData(collection) {
    const answer = await fetch(BASE_URL + collection);
    const data = await answer.json();
    return data;
}

async function searchProducts() {
    const products = await loadData("/produtos")
    return products;
    
}

async function searchBrands() {
    const brands = await loadData("/marcas")
    return brands;
    
}

async function searchProductSpecific(key, value) {
    const promotionProducts = await loadData(`/produtos?${key}=${value}`)
    return promotionProducts;
}

async function searchCategorias() {
    const categories = await loadData("/categorias");
    return categories;
}

async function searchProductsByCategory(category) {
    const categories = await loadData(`/categorias?UID=${category}`);
    return categories[0].produtos;
    
}

async function includePromotionProducts() {
    const products = await searchProductSpecific("promocao", "true"),
    containerPromocao = document.querySelector(".featured__container");
    for(const product of products){
        const { nome, preco, imagem} = product,
        valor = preco.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
        containerPromocao.innerHTML +=`
        <article class="juice">
            <div class="juice__sale">Promoção</div>
            <img src="${BASE_URL}${imagem.url}" alt="" class="juice__img" />
            <span class="juice__name">${nome}</span>
            <span class="juice__price">${valor}</span>
            <a href="#" class="button-light"
              >Adicionar ao carrinho <i class="bx bx-right-arrow-alt button-icon"></i
            ></a>
          </article>
        `
    }
}

async function includeProductsByCategory() {
    const produtos = await searchProductsByCategory("esporte"),
    containerBikes = document.querySelector(".tropicais__container");
    for(const produto of produtos){
      const { nome, preco, imagem} = produto,
      valor = preco.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
        containerBikes.innerHTML +=`
        <article class="juice">
            <img src="${BASE_URL}${imagem.url}" alt="" class="juice__img" />
            <span class="juice__name">${nome}</span>
            <span class="juice__price">${valor}</span>
            <a href="#" class="button-light">
              Adicionar ao carrinho
              <i class="bx bx-right-arrow-alt button-icon"></i>
            </a>
          </article>
        `
    }
}

async function includeBrands() {
    const brands = await searchBrands(),
    containerBrands = document.querySelector(".new__container");
    for(const brand of brands){
        const { nome } = brand
        containerBrands.innerHTML +=`
        <div class="new__juice-card">
        <h3 class="new__title">${nome}</h3>
        <div class="new__juice-overlay">
          <a href="#" class="button">Conheça essa Marca</a>
        </div>
      </div>
        `
    }
}

async function allProducts(){
    const products = await searchProducts(),
    containerProdutos = document.querySelector(".featured__containerr");
    for(const product of products){
        const { nome, preco, imagem} = product,
        valor = preco.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
        containerProdutos.innerHTML +=`
        <article class="juice">
            <img src="${BASE_URL}${imagem.url}" alt="" class="juice__img" />
            <span class="juice__name">${nome}</span>
            <span class="juice__price">${valor}</span>
            <a href="#" class="button-light"
              >Adicionar ao carrinho <i class="bx bx-right-arrow-alt button-icon"></i
            ></a>
          </article>
        `
        
    }
}

includePromotionProducts();
includeProductsByCategory();
includeBrands();
allProducts();