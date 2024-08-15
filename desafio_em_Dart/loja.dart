import 'dart:io';

void main() {
  String Texto_Desconto = "Você ganhou 15% de desconto!!! Seu pedido ficou: ";
  final double precoCamiseta = 20.00,
      precoBlusa_de_Frio = 50.00,
      precoCalca_Jean = 100.00;
  print("Seja Bem vindo a Loja do Guilherme!!!");
  print('');
  print("Oque deseja comprar?");
  print('');
  print("1- Camiseta 20,00 ");
  print("2- Blusa De Frio 50,00");
  print("3- Calça Jeans 100,00");
  String? escolhaDePecas = stdin.readLineSync();

  switch (escolhaDePecas) {
    case '1':
      {
        print(
            'O preço da Camiseta e $precoCamiseta e a partir de 15 peca voce ganha 15% de desconto no valor final');
        print('Quantas pecas deseja?');
        String? quantidade_De_Pecas = stdin.readLineSync();
        if (quantidade_De_Pecas != null && isNumeric(quantidade_De_Pecas)) {
          int quantidade = int.parse(quantidade_De_Pecas);

          double valorFinal = quantidade * precoCamiseta;
          if (quantidade >= 15) {
            double valor_Com_Desconto = valorFinal * 0.85;
            print('');
            print(Texto_Desconto + valor_Com_Desconto.toString());
            double quantidade_Do_desconto = valorFinal - valor_Com_Desconto;
            print('Você teve $quantidade_Do_desconto Reais de desconto');
            print('O valor sem desconto seria: $valorFinal');
          } else if (quantidade < 15 && quantidade > 0) {
            print('O preço total ficou: $valorFinal');
          }
        }
      }
      break;
    case '2':
      {
        print(
            'O preço da Blusa de Frio e $precoBlusa_de_Frio e a partir de 15 peca voce ganha 15% de desconto no valor final');
        print('');
        print('Quantas pecas deseja?');
        String? quantidade_De_Pecas = stdin.readLineSync();
        if (quantidade_De_Pecas != null && isNumeric(quantidade_De_Pecas)) {
          int quantidade = int.parse(quantidade_De_Pecas);

          double valorFinal = quantidade * precoBlusa_de_Frio;
          if (quantidade >= 15) {
            double valor_Com_Desconto = valorFinal * 0.85;
            print(Texto_Desconto + valor_Com_Desconto.toString());
            double quantidade_Do_desconto = valorFinal - valor_Com_Desconto;
            print('Você teve $quantidade_Do_desconto Reais de desconto');
            print('O valor sem desconto seria: $valorFinal');
          } else if (quantidade < 15 && quantidade > 0) {
            print('O preço total ficou: $valorFinal');
          }
        }
      }
      break;
    case '3':
      {
        print(
            'O preço da Calça Jeans é $precoCalca_Jean e a partir de 15 peças você ganha 15% de desconto no valor final');
        print('Quantas peças deseja?');
        String? quantidade_De_Pecas = stdin.readLineSync();
        if (quantidade_De_Pecas != null && isNumeric(quantidade_De_Pecas)) {
          int quantidade = int.parse(quantidade_De_Pecas);

          double valorFinal = quantidade * precoCalca_Jean;
          if (quantidade >= 15) {
            double valor_Com_Desconto = valorFinal * 0.85;
            print(Texto_Desconto + valor_Com_Desconto.toString());
            double quantidade_Do_desconto = valorFinal - valor_Com_Desconto;
            print('Você teve $quantidade_Do_desconto Reais de desconto');
            print('O valor sem desconto seria: $valorFinal');
          } else if (quantidade < 15 && quantidade > 0) {
            print('O preço total ficou: $valorFinal');
          }
        }
      }
      break;
  }
  print('-------------------------------------------------');
  print(
      'Digite seu email, para que possamos lhe enviar todos dados e atualizações de sua compra:');
  String? email_Cliente = stdin.readLineSync();
  String envio_Do_email =
      ('Assim que o pagamento for efetuado e confirmado, enviaremos o codigo do pedido no email abaixo: ');
  print('-------------------------------------------------');
  print('Qual será a forma de pagamento?');
  print('');
  print('1- Credito');
  print('2- Pix');
  print('3- Boleto');
  String? formaDePagamento = stdin.readLineSync();
  switch (formaDePagamento) {
    case '1':
      {
        String error_Cartao =
                'Catão invalido sertifique-se que todos dados estao inseridos corretamente',
            dados_Catao = "Dado Registrado com Susseso: ";
        print("Digite o Numero do cartao");

        String? Numero_Do_Cartao = stdin.readLineSync();

        print("Digite o Nome impresso no cartao");
        String? Nome_No_Cartao = stdin.readLineSync();

        print("Digite da data de validade do cartao (ex: 01/31)");
        String? Data_Vencimento_Do_Cartao = stdin.readLineSync();

        print("Digite o CVV do catao");
        String? CVV_Do_Cartao = stdin.readLineSync();

        print("Digite o CPF do titutal do cartao");
        String? cpf_Titular_Cartao = stdin.readLineSync();

        bool isValid = true;

        if (Numero_Do_Cartao == null ||
            Nome_No_Cartao == null ||
            Data_Vencimento_Do_Cartao == null ||
            CVV_Do_Cartao == null ||
            cpf_Titular_Cartao == null) {
          isValid = false;
        }
        if (Numero_Do_Cartao != null) {
          if (Numero_Do_Cartao.length < 13 ||
              Numero_Do_Cartao.length > 16 ||
              !isNumeric(Numero_Do_Cartao)) {
            isValid = false;
          }
        }
        if (Nome_No_Cartao != null) {
          if (Nome_No_Cartao.length > 50) {
            isValid = false;
          }
        }
        if (Data_Vencimento_Do_Cartao != null) {
          if (Data_Vencimento_Do_Cartao.length != 5) {
            isValid = false;
          }
        }
        if (CVV_Do_Cartao != null) {
          if (CVV_Do_Cartao.length != 3 || !isNumeric(CVV_Do_Cartao)) {
            isValid = false;
          }
        }
        if (cpf_Titular_Cartao != null) {
          if (cpf_Titular_Cartao.length != 11 ||
              !isNumeric(cpf_Titular_Cartao)) {
            isValid = false;
          }
        }
        if (!isValid) {
          print(error_Cartao);
        } else {
          print('');
          print(dados_Catao);
          print('Visão geral dos dados');
          print('-------------------------------------------------');
          print('Numero do Cartão: $Numero_Do_Cartao');
          print('Nome no Catão: $Nome_No_Cartao');
          print('Data de Vencimento: $Data_Vencimento_Do_Cartao');
          print('CVV do cartão: $CVV_Do_Cartao');
          print('Cpf do titular do cartão: $cpf_Titular_Cartao');
          print('-------------------------------------------------');
          print(envio_Do_email);
          print(email_Cliente);
        }
      }
      break;
    case '2':
      {
        print('-------------------------------------------------');
        print('Codigo pix:');
        print('Numero de telefone');
        print('(11) 98448-3408');
        print('Nome: Guilherme Cruz Santos');
        print('Banco: NuBank');
        print('-------------------------------------------------');
        print(envio_Do_email);
        print(email_Cliente);
      }
      break;
    case '3':
      {
        print('-------------------------------------------------');
        print('Iremos enviar o boleto em seu email : $email_Cliente');
        print('');
        print(
            'Após o pagamento do boleto terá até 3 dias uteis para que o pagamento seja confirmado');
        print(envio_Do_email);
        print(email_Cliente);
        print('-------------------------------------------------');
      }
      break;
  }
}

bool isNumeric(String str) {
  final numericRegex = RegExp(r'^-?[0-9]+(\.[0-9]+)?$');
  return numericRegex.hasMatch(str);
}
