/* eslint-disable */
/**
 * List of questions organized in one single object with each topic
 */

// ! Lista base de algoritmos de ordenação
/**
 * Sort an array in ascending order
 * @param originalArray:array - Original array
 * @returns [] - Sorted array
 */
function BubbleSort(originalArray) {
  // Make a copy of the original array
  let arr = [...originalArray]

  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

export const questions = {
  // Questões de Ordenação
  ordenacao: [
    {
      id: 'ordenacao-1',
      title: 'Ordenação 1',
      text: `
Utilizando o método de ordenação **bubble sort**, quantas trocas são necessárias para que a sequência **[{vet=4:84:{5:7}}]** seja ordenada do modo **{asc=1:2}**?

1 = Crescente | 2 = Descrecente
      `,
      answer: function (metodo, vet, asc) {
        let swapCounter = 0

        // Bubble Sort customizado para contar as trocas realizadas
        let arr = [...vet]

        let swapped;

        // Ascendente
        if (asc === 1) {
          do {
            swapped = false;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] > arr[i + 1]) {
                swapCounter++;// incrementar a qtd de trocas feitas

                let tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = true;
              }
            }
          } while (swapped);
        } else {
          do {
            swapped = false;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] < arr[i + 1]) {
                swapCounter++;// incrementar a qtd de trocas feitas

                let tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = true;
              }
            }
          } while (swapped);
        }

        return swapCounter
      },
      subject: 'ordenacao',
      level: 1,
      tags: ['tags']
    },
  ],

  // Questões de Busca
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
        }
        return vet.length + 1
      },
      subject: 'busca',
      level: 1, //1 para facil, 2 para medio, 3 para dificil
      tags: ['busca binária', 'busca', 'conceito'],
    },

    // Retorna o index do primeiro valor encontrado e retorna -1 se não for encontrado. 
    {
      id: 'busca-2',
      title: 'Busca sequencial [TESTADO]',
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
    },
    {
      id: 'busca-3',
      title: 'Questao de busca 3',
      text: `Suponha que você está realizando uma busca sequencial no vetor: \`[{vet=3:13:+{6:11}}]\` 
     Quantas comparações serão realizadas se o valor buscado for \`{valor=3:13}\`?
      `,
      answer: function answer(values, userInput) {
        const { vet, valor } = values
        for (let i = 0; i < vet.length; i++) {
          if (
            vet[i] === valor &&
            i + 1 === userInput
          ) {
            return true;
          }
        }
        return false
      },
      subject: 'Busca',
      level: 1,
      tags: ['busca sequencial', 'busca']
    }
  ],

  // Questões de Pilha
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
          return resp;
        }
      },
      subject: 'pilha',
      level: 1,
      tags: ['pilha', 'pilha funcionamento', 'push', 'pop']
    },
    {
      id: 'pilha-1',
      title: 'Questao de pilha 1',
      text: `Considere o método de busca sequencial em um vetor contendo os elementos: ** [{ vet=2: 23: +{ 5: 10 } }] **. 
  
  Qual deve ser o retorno da busca quando o usuário pesquisar pelo item ** "{valor=2:23}" **? `,
      answer: function answer(vet, valor) {
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] === valor) return i;
        }
        return true;
      },
      subject: 'pilha',
      level: 1,
      tags: ['pilha', 'pilha funcionamento', 'push', 'pop'],
    }
  ],
  fila: [
    {
      id: 'fila-1',
      title: 'Questão sobre Fila [TESTADO]',
      text: `Se os elementos **[{vet=1:10:{3:6}}]** são adicionados a uma fila e são depois removidos da fila, em qual ordem eles serão removidos?`,
      answer: function(values) {
        const { vet } = values
        let inputArr = [...vet]// copiar o vetor
        let answer = []// resposta a ser retornada
        while (inputArr.length) {
          answer.push(inputArr.shift())
        }
        return answer
      },
      verifyAnswer: function (values, userInput) {},
      subject: 'Fila',
      level: 1, 
      tags: ['fila']
    },
  ]
}
