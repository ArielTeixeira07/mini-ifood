function fazerPedido(){
    let opcao = prompt("Digite o número do seu pedido");
    let total = 0;
    let produto = "";
    //Escolha do produto
    if(opcao == 1) {
        produto = "Hambúrguer";
        total = 20;
    }else if(opcao == 2){
        produto = "Pizza";
        total = "30";
    }else if(opcao == 3){
        produto = "Refrigerante";
        total = "10";
    } else {
        alert("Opção inválida");
        return;
    }

    //Regra de frete
    if(total >=25){
        alert("Frete grátis");
    } else{
        total = total + 5;
    }

    //Resultado final
    alert("Pedido: " + produto + "\nTotal: R$ " + total);
}



let carrinho = [];

const botoes = document.querySelectorAll(".card button");

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.nome;
        const preco = botao.dataset.preco;

        const produtoExistente = carrinho.find ((produto) => produto.nome === nome);
        if (produtoExistente) {
            produtoExistente.quantidade ++;
        }else {
            carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
        }

        mostrarCarrinho();

        console.log("Produto:", nome);
        console.log("Preço :", preco);
        console.log("Carrinho:", carrinho);
    });
});

function mostrarCarrinho(){
    const listaCarrinho = document.querySelector("#listaCarrinho");
    const totalCarrinho = document.querySelector("#totalCarrinho");

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto) => {
        const item = document.createElement("div");

        const nome = document.createElement("span");
        nome.textContent = produto.nome + "-R$ " + Number(produto.preco).toFixed(2).replace(".", ",");

        const diminuir = document.createElement("button");
        diminuir.textContent = "-";

        diminuir.addEventListener("click", () => {
            produto.quantidade--;

            if (produto.quantidade === 0) {
                carrinho = carrinho.filter((item) => item !== produto);
            }

            mostrarCarrinho();
        });

        const quantidade = document.createElement("span");
        quantidade.textContent = produto.quantidade;

        const aumentar = document.createElement("button");
        aumentar.textContent = "+";

        aumentar.addEventListener("click", () => {
            produto.quantidade++;
            mostrarCarrinho();
        });

        item.appendChild(nome);
        item.appendChild(diminuir);
        item.appendChild(quantidade);
        item.appendChild(aumentar);

        listaCarrinho.appendChild(item);

        total += produto.preco * produto.quantidade;
    });

    totalCarrinho.textContent = "Total: R$ " + total.toFixed(2).replace("." , ",");
}
