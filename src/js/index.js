function fazerPedido() {
    let opcao = prompt("Digite o número do seu pedido");
    let total = 0;
    let produto = "";
    //Escolha do produto
    if (opcao == 1) {
        produto = "Hambúrguer";
        total = 20;
    } else if (opcao == 2) {
        produto = "Pizza";
        total = "30";
    } else if (opcao == 3) {
        produto = "Refrigerante";
        total = "10";
    } else {
        alert("Opção inválida");
        return;
    }

    //Regra de frete
    if (total >= 25) {
        alert("Frete grátis");
    } else {
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

        const produtoExistente = carrinho.find((produto) => produto.nome === nome);
        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });
        }

        mostrarCarrinho();
        atualizarContador();

        console.log("Produto:", nome);
        console.log("Preço :", preco);
        console.log("Carrinho:", carrinho);
    });
});

function mostrarCarrinho() {
    const listaCarrinho = document.querySelector("#listaCarrinho");
    const totalCarrinho = document.querySelector("#totalCarrinho");

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto) => {
        const item = document.createElement("div");

        const nome = document.createElement("span");
        nome.textContent = produto.nome;

        const preco = document.createElement("span");
        preco.textContent = "R$ " + Number(produto.preco).toFixed(2).replace(".", ",");

        const diminuir = document.createElement("button");
        diminuir.textContent = "-";

        diminuir.addEventListener("click", () => {
            produto.quantidade--;

            if (produto.quantidade === 0) {
                carrinho = carrinho.filter((item) => item !== produto);
            }

            mostrarCarrinho();
            atualizarContador();
        });

        const quantidade = document.createElement("span");
        quantidade.textContent = produto.quantidade;

        const aumentar = document.createElement("button");
        aumentar.textContent = "+";

        aumentar.addEventListener("click", () => {
            produto.quantidade++;

            mostrarCarrinho();
            atualizarContador();
        });
        const remover = document.createElement("img");
        remover.src = "./src/img/bin.png";
        remover.alt = "remover produto";

        remover.addEventListener("click", () => {
            carrinho = carrinho.filter((item) => item !== produto);
            mostrarCarrinho();
            atualizarContador();
        });

        item.appendChild(nome);
        item.appendChild(preco);
        item.appendChild(diminuir);
        item.appendChild(quantidade);
        item.appendChild(aumentar);
        item.appendChild(remover);

        listaCarrinho.appendChild(item);

        total += produto.preco * produto.quantidade;
    });

    totalCarrinho.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function atualizarContador() {
    const contador = document.querySelector("#contadorCarrinho");

    let quantidadeTotal = 0;

    carrinho.forEach((produto) => {
        quantidadeTotal += produto.quantidade;
    });

    contador.textContent = quantidadeTotal;
}

const linkCarrinho = document.querySelector("#linkCarrinho");
const carrinhoElemento = document.querySelector("#carrinho");
const fecharCarrinho = document.querySelector("#fecharCarrinho");

linkCarrinho.addEventListener("click", () => {
    carrinhoElemento.classList.add("aberto");
});

fecharCarrinho.addEventListener("click", () => {
    carrinhoElemento.classList.remove("aberto");
});

const botaoFinalizar = document.querySelector("#finalizarPedido");

const modalConfirmacao = document.querySelector("#modalConfirmacao");

const subtotalPedido = document.querySelector("#subtotalPedido");
const fretePedido = document.querySelector("#fretePedido");
const totalPedido = document.querySelector("#totalPedido");

const voltarCarrinho = document.querySelector("#voltarCarrinho");
const confirmarPedidoModal = document.querySelector("#confirmarPedidoModal");
const modalSucesso = document.querySelector("#modalSucesso");
const fecharModalSucesso = document.querySelector("#fecharModalSucesso");

let subtotal = 0;
let frete = 0;
let totalFinal= 0;

// Abrir a janela de confirmação
botaoFinalizar.addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    subtotal = 0;

    carrinho.forEach((produto) => {
        subtotal += Number(produto.preco) * produto.quantidade;
    });

    frete = 0;

    if (subtotal < 25) {
        frete = 5;
    }

    totalFinal = subtotal + frete;

    // Mostrar os valores na janela
    subtotalPedido.textContent =
        "R$ " + subtotal.toFixed(2).replace(".", ",");

    fretePedido.textContent =
        "R$ " + frete.toFixed(2).replace(".", ",");

    totalPedido.textContent =
        "R$ " + totalFinal.toFixed(2).replace(".", ",");

    // Abrir a janela
    modalConfirmacao.style.display = "flex";
});

// Voltar ao carrinho
voltarCarrinho.addEventListener("click", () => {

    modalConfirmacao.style.display = "none";

});

// Confirmar o pedido
confirmarPedidoModal.addEventListener("click", () => {

    carrinho = [];

    mostrarCarrinho();
    atualizarContador();

    modalConfirmacao.style.display = "none";

    carrinhoElemento.classList.remove("aberto");

    //Abrir modal de sucesso
    modalSucesso.style.display = "flex";
});

//Fechar modal de sucesso
fecharModalSucesso.addEventListener("click", () =>{
    modalSucesso.style.display = "none";
});

