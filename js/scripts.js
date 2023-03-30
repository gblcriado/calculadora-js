const operacaoAnteriortxt = document.querySelector("#operacao-anterior");
const operacaoAtualtxt = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#container-botoes button");

class Calculadora {
  constructor(operacaoAnteriortxt, operacaoAtualtxt) {
    this.operacaoAnteriortxt = operacaoAnteriortxt;
    this.operacaoAtualtxt = operacaoAtualtxt;
    this.operacaoAtual = "";
  }

  // adicionar digito na tela da calculadora
  addDigit(digit) {

    //checar se a operacao atual tem ponto
    if (digit === "." && this.operacaoAtualtxt.innerText.includes(".")) {
      return;
    }
    this.operacaoAtual = digit
    this.atualizarTela()

  }

  // Processar todos metodos de calculo
  processarOperacao(operacao) {
    // Chegar se o valor atual esta vazio
    if (this.operacaoAtualtxt.innerText === "" && operacao !== "C") {
      // Trocar operacao
      if (this.operacaoAnteriortxt.innerText !== "") {
        this.trocarOperacao(operacao);
      }
      return;
    }


    //Valor atual e anterior
    let opValue;
    const anterior = +this.operacaoAnteriortxt.innerText.split(" ")[0];
    const atual = +this.operacaoAtualtxt.innerText;

    switch (operacao) {
      case "+":
        opValue = anterior + atual
        this.atualizarTela(opValue, operacao, atual, anterior)
        break;
      case "-":
        opValue = anterior - atual
        this.atualizarTela(opValue, operacao, atual, anterior)
        break;
      case "/":
        opValue = anterior / atual
        this.atualizarTela(opValue, operacao, atual, anterior)
        break;
      case "*":
        opValue = anterior * atual
        this.atualizarTela(opValue, operacao, atual, anterior)
        break;
      case "DEL":
        this.operacaoDel()
        break;
      case "CE":
        this.operacaoCE()
        break;
      case "C":
        this.operacaoC()
        break;
        case "=":
        this.operacaoIgual()
        break;
      default:
        return;

    }
  }

  //Mudar valores na tela da calculadora
  atualizarTela(
    opValue = null,
    operacao = null,
    atual = null,
    anterior = null) {

    if (opValue === null) {
      this.operacaoAtualtxt.innerText += this.operacaoAtual;
    } else {
      // Checar se o valor e zero, se for adicionar valor atual
      if (anterior === 0) {
        opValue = atual
      }
      // adicionar valor atual para o anterior
      this.operacaoAnteriortxt.innerText = `${opValue} ${operacao}`
      this.operacaoAtualtxt.innerText = ""
    }
  }

  // Mudar expressoes matematicas
  trocarOperacao(operacao) {
    const operacaoMat = ["*", "/", "+", "-"]

    if (!operacaoMat.includes(operacao)) {
      return
    }

    this.operacaoAnteriortxt.innerText = this.operacaoAnteriortxt.innerText.slice(0, -1) + operacao;
  }

  //Deletar o ultimo digito
  operacaoDel() {
    this.operacaoAtualtxt.innerText = this.operacaoAtualtxt.innerText.slice(0, -1)
  }

  //Deletar a operacao atual
  operacaoCE() {
    this.operacaoAtualtxt.innerText = "";
  }
  //Deletar todas as operacoes
  operacaoC() {
    this.operacaoAnteriortxt.innerText = "";
    this.operacaoAtualtxt.innerText = "";
  }

  // Processar a operacao
  operacaoIgual(){
    const operacao = operacaoAnteriortxt.innerText.split(" ")[1];

    this.processarOperacao(operacao);
  }
}

const calc = new Calculadora(operacaoAnteriortxt, operacaoAtualtxt);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processarOperacao(value);
    }
  });
});