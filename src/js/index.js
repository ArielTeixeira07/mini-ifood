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