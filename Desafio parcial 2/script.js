const objNumerosPrimos = [2, 17, 4, 23, 10, 13, 8, 19, 21];
const NumerosPrimos = [];

function calculo(numero) {
  if (numero <= 1) {
    return false;
  }
  for (let divisao = 2; divisao * divisao <= numero; divisao++) {
    if (numero % divisao === 0) {
      return false;
    }
  }
  return true;
}

for (let posicoes = 0; posicoes < objNumerosPrimos.length; posicoes++) {
  if (calculo(objNumerosPrimos[posicoes]))
    NumerosPrimos.push(objNumerosPrimos[posicoes]);
}

console.log(NumerosPrimos);
