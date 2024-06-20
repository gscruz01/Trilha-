let NomeProduto = document.getElementById("name");
let Preco = document.getElementById("preco");
let Quantidade = document.getElementById("quant");
let resultado = document.getElementById("dados");
let Produto = [];

//? ------------------------- Função Adicionar Produto ao Array Produto -------------------------
function add() {
  //TODO------------------------- Gerador de ID aleatorio de 1 a 1000 sem repetição-------------------------
  let maximoIds = 1000;
  let indice,
    arrayIds = [];
  for (indice = 0; indice < maximoIds; indice++) {
    arrayIds[indice] = indice + 1;
  }
  let idsRestantes, indiceAleatorio, idTemporario;
  for (idsRestantes = arrayIds.length; idsRestantes; ) {
    indiceAleatorio = (Math.random() * idsRestantes--) | 0;
    idTemporario = arrayIds[indiceAleatorio];
    arrayIds[indiceAleatorio] = arrayIds[idsRestantes];
    arrayIds[idsRestantes] = idTemporario;
  }
  //TODO ------------------------- Fim do gerador de Id -------------------------

  //*-------------------------Adicionando os Valores no Array-------------------------

  Produto.push({
    ID: idTemporario,
    Nome: NomeProduto.value,
    Preço: parseFloat(Preco.value),
    Quantidade: parseInt(Quantidade.value),
  });
  //* ------------------------- Fim da adição dos valores dentro do Array  -------------------------

  //TODO------------------------- Variavel que ira chamar somente o ultimo valor inserido-------------------------

  let ultimoProduto = Produto[Produto.length - 1];
  //TODO ------------------------- Fim da adição dos valores dentro do Array -------------------------

  //*-------------------------Imprimindo o ultimo produto adicionado-------------------------

  console.log("O produto abaixo foi adicionado");
  console.log(ultimoProduto);
  //* ------------------------- Fim da impresão do ultimo produto adicionado -------------------------

  //TODO-------------------------Apagando os valores inseridos dentro dos inputs-------------------------

  NomeProduto.value = "";
  Preco.value = "";
  Quantidade.value = "";
  NomeProduto.focus();
  // TODO------------------------- Fim da limpeza de imput -------------------------

}
//? ------------------------- Fim da função adicionar Produto ao Array Produto -------------------------

//? ------------------------- Função para remover as chaves { } e aspas " " na hora da impressão do array de objetos-------------------------

function formatarObjeto(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");
}
//? ------------------------- Fim da função para remover as chaves { } e aspas " " na hora da impressão do array de objetos -------------------------

//? ------------------------- Função para remover as os colchetes [ ] na hora da impressão do array de objetos-------------------------

function consultar_Estoque() {
  let formatarArray = Produto.map(formatarObjeto).join("\n");
  resultado.innerText = formatarArray;
  console.log("Todos os itens adicionados estão listados abaixo" )
  console.log(formatarArray)
}
//? ------------------------- Fim da função de imprimir todos pordutos e remover os colchetes -------------------------

//? ------------------------- Função para renomear o produto pelo ID -------------------------

function Rename() {

  //! ------------------------- Selecionar a qual dado sará atualizado -------------------------

  let OpcaoDeDado = prompt(
    "Qual dado deseja alterar:\n digite 1 para Nome.\n digite 2 para Preço.\n digite 3 para Quantidade.\n (Obs: Somente é possivel alterar um dado por vez)."
  );
  //* ------------------------- Encontrar o produto pelo ID -------------------------
  let id = prompt("Insira o ID do Produto:");
  switch (OpcaoDeDado) {
    case "1":

      //TODO-------------------------Atualizar o nome-------------------------

      let novoNome = prompt("Insira o Novo nome do produto:");
      for (let i = 0; i < Produto.length; i++) {
        if (Produto[i].ID == id) {
          Produto[i].Nome = novoNome;
          console.log(`Produto com ID ${id} renomeado para ${novoNome}`);
          consultar_Estoque();
          return;
        }
      }
      break;

    //TODO-------------------------Atualizar o preço-------------------------

    case "2":
      let novoPreco = prompt("Insira o novo preço do produto:");
      Number(novoPreco);
      for (let i = 0; i < Produto.length; i++) {
        if (Produto[i].ID == id) {
          if(isNaN != novoPreco ){
            alert("Isso não é um Numero")
          }
          else{
            Produto[i].Preço = novoPreco;
          console.log(`Produto com ID ${id} renomeado para ${novoPreco}`);
          console.log(Produto);
          consultar_Estoque();
          return;
          }
        }
      }
      break;

    //TODO-------------------------Atualizar a Quantidade-------------------------

    case "3":
      let novaQuatidade = prompt("Insira a nova quantidade do produto:");
      for (let i = 0; i < Produto.length; i++) {
        if (Produto[i].ID == id) {
          Produto[i].Quantidade = novaQuatidade;
          console.log(
            `A nova quantidade do produto com ID ${id} foi alterada para ${novaQuatidade}`
          );
          consultar_Estoque();
          return;
        }
      }

      break;
    // Error
    default:
      alert("O numero inserido não é valido");
      break;
  }
  //TODO ------------------------- Fim do switch case -------------------------

  
}
//? -------------------------- Fim da função de renomear produto  -------------------------

//? ------------------------- Função para somar todos os preços dos produtos -------------------------
function somarPrecosTotal() {
  let PrecoTotal = Produto.reduce(
    (total, produto) => total + produto.Preço,
    0
  );
  resultado.innerText = `Preço Total: ${PrecoTotal}`;
  console.log(`Preço Total ${PrecoTotal}`)
}

//? --------------- Função para somar todos os preços dos produtos ---------------

//? --------------- Função para somar toda quantidade dos produtos ---------------

function somarQuantidadeTotal() {
  let totalQuantidade = Produto.reduce(
    (total, produto) => total + produto.Quantidade,
    0
  );
  resultado.innerText = `Quantidade total: ${totalQuantidade}`;
  console.log (`Quantidade total: ${totalQuantidade}`)
}

//? -------------------------- Fim da função de somar toda quantidade dos produtos  -------------------------
