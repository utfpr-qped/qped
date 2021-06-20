/* eslint-disable */
/**
 * Lists of questions organized in one single object with each topic
 * 
 * TODO This list of questions works as dummy data, it needs to be replaced with the correct questions
 */
export const questions = {
  busca: [
    {
      id: 'busca-1',
      title: 'Busca sequencial',
      text: `Suponha que você está realizando uma busca sequencial no vetor:    
  \`[{vet=3:13:+{6:11}}]\`     
  Quantas comparações serão realizadas se o valor buscado for \`{valor=3:13}\`?`,
      verifyAnswer: function (values, userInput) {
        const { vet, valor } = values
        for (let i = 0; i < vet.length; i++) {
          if (
            vet[i] === valor &&
            i + 1 === userInput
          ) {
            return true;
          }
        }

        // if the value is not in the array, then the correct verifyAnswer is the size of the array + 1
        if (userInput === vet.length + 1) return true;

        // if the user input doesn't apply to any of the cases above, it is incorrect
        return false;
      },
      answer: function (values) {
        const { vet, valor } = values
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] === valor) {
            return i + 1
          }
          return vet.length
        }
      },
      subject: 'busca',
      level: 1, //1 para facil, 2 para medio, 3 para dificil
      tags: ['busca binária', 'busca', 'conceito'],
    },
    {
      id: 'busca-2',
      title: 'Busca sequencial [antigo, funcionando]',
      text: `Suponha que você está realizando uma busca sequencial no vetor: \`[{vet=3:13:+{6:11}}]\` 
     Quantas comparações serão realizadas se o valor buscado for \`{valor=3:13}\`?
      `,
      answer: function (values) {
        const { vet, valor } = values

        for (let i = 0; i < vet.length; i++) {
          if (vet[i] == valor) return i+1;
        }
        
        return vet.length+1;
      },
      verifyAnswer: function (values, userInput) {},
      subject: 'Busca',
      level: 1,
      tags: ['busca sequencial', 'busca']
    }
  ],
  pilha: [
    {
      id: 'pilha-1',
      title: 'Simulacao de pilha',
      text:
        `Se a seguinte sequência de operações é realizada com uma pilha:
        \`{operacoes}\`    

        Em qual ordem os elementos serão removidos da pilha?
        <operacoes>
          <op value="1101100010">push({a=1:5}), push({b=1:5}), pop(), push({c=1:5}), push({d=1:5}), pop(), pop(), pop(), push({e=1:5}), pop()</op>
          <op value="1100110100">push({a=1:5}), push({b=1:5}), pop(), pop(), push({c=1:5}), push({d=1:5}), pop(), push({e=1:5}), pop(), pop()</op>
          <op value="1110010100">push({a=1:5}), push({b=1:5}), push({c=1:5}), pop(), pop(), push({d=1:5}), pop(), push({e=1:5}), pop(), pop()</op>
          <op value="1011011000">push({a=1:5}), pop(), push({b=1:5}), push({c=1:5}), pop(), push({d=1:5}), push({e=1:5}), pop(), pop(), pop()</op>
          <op value="1010110100">push({a=1:5}), pop(), push({b=1:5}), pop(), push({c=1:5}), push({d=1:5}), pop(), push({e=1:5}), pop(), pop()</op>
        </operacoes>`,
      verifyAnswer: function ({ operacoes, a, b, c, d, e }) {
        let ops = operacoes.split('');
        let values = [e, d, c, b, a];
        let stack = [];
        let resp = [];
        for (let i = 0; i < ops.length; i++) {
          // eslint-disable-next-line
          if (ops[i] == '1') {
            stack.push(values.pop());
          } else {
            resp.push(stack.pop());
          }
        }
        return resp;
      },
      subject: 'pilha',
      level: 1,
      tags: ['pilha', 'pilha funcionamento', 'push', 'pop'],
    }
  ]
  //,fila: []
}
