//----------------OPERAÇÕES COM VARIAVEIS---------------- 
console.log('------------------ Questões da 1 a 1.7------------------ ')
const nome = 'Guilherme Cruz Santos';
let idade = 19;
let altura = 1.93;
let peso = 97.5;

console.log (nome);
console.log(idade);
console.log(altura);
console.log(peso);
console.log(nome + " / " + idade  + " / " + altura + " / " + peso);

let idade_daqui_5_anos = idade + 5 ;
let IMC = peso / (altura ** 2);
    
console.log ("idade daqui 5 anos = " + idade_daqui_5_anos);

console.log("Resultado de IMC")
console.log(IMC);
// ----------------CONDICIONAIS----------------
console.log('------------------ Questões da 2 a 2.3------------------ ')
 let Idade ;
Idade = 18 ;
if (Idade >= 18){
    console.log("Você é maior de idade");
}
else if(Idade >= 13 || idade <= 17) {
    console.log("Voçê é um adolecente");
}
else {
    console.log("Você é uma criança")
}

// ----------------ESTRUTURA DE REPETIÇÃO---------------- 
console.log('------------------  Questões da 3 a 3.3 ------------------ ' )

 let numeroParaContagem = prompt("insira um numero");
 Number(numeroParaContagem);
 if(numeroParaContagem <= 2){
    console.log('Numero valido')
 }
 else {
    console.log('Numero invalido')
 }
 while(numeroParaContagem >= 1 ){
    console.log(numeroParaContagem)
    numeroParaContagem --;

 }
 console.log ('------------------ Fim da contagem ------------------ ')
// ----------------ESTRUTURA DE REPETIÇÃO ANINHADAS---------------- 
console.log(' ------------------ Questões da 4 a 4.1 ------------------ ')
let x = 1;

while (x <= 100) {
  console.log(x);
  x++;
  if (x === 101) {
    let y = prompt(
      "digite 0 para sair ou qualquer outro de 1 a 100 para continuar"
    );
    y = Number(y);

    if (y === 0) {
      alert("O Programa foi finalizado");
      break;
    } else if (y >= 1 || y <= 100) {
      x = y;
    } else {
      ("Esse numero não esta entra 1 e 100, digite um numero valido");
    }
  }
}


// ----------------------
while (true) {
  let x = 1;

  while (x <= 100) {
    console.log(x);
    x++;
  }

  let y = prompt(
    "digite 0 para sair ou qualquer outro de 1 a 100 para continuar"
  );

  y = Number(y);

  if (y === 0) {
    alert("O Programa foi finalizado");
    break;
  } else if (y >= 1 || y <= 100) {
    x = y;
  } else {
    alert("Esse numero não esta entra 1 e 100, digite um numero valido");
  }
}
