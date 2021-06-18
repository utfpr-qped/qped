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
      id: 'busca-seq-1',
      title: 'Busca sequencial 1',
      text:
`Suponha que você está realizando uma busca sequencial no vetor: **[{vet=3:13:+{6:11}}]**.

Quantas comparações serão realizadas se o valor buscado for **"{valor=3:13}"**?`,
      answer: function (vet, valor) {
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] == valor) return i + 1;
        }
        return vet.length;
      },
      subject: 'busca',
      level: 1, //1 para facil, 2 para medio, 3 para dificil
      tags: ['busca binária', 'busca', 'conceito']
    },

    // Retorna o index do primeiro valor encontrado e retorna -1 se não for encontrado. 
    {
      id: 'busca-2',
      title: 'Busca regular 1',
      text: `
Considere o método de busca sequencial em um vetor contendo os elementos: **[{vet=2:23:+{5:10}}]**. 

Qual deve ser o retorno da busca quando o usuário pesquisar pelo item **"{valor=2:23}"**?
      `,
      answer: function (vet, valor) {
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] == valor) return i;
        }
        return -1;
      },
      subject: 'busca',
      level: 1,
      tags: ['busca sequencial']
    },

    {
      id: 'busca-3',
      title: 'Busca regular 2',
      text: `
Suponha que seja feita uma busca sequencial otimizada no vetor **[{vet=1:10:{5:10}}]** que deve ser ordenado antes da busca. 

Quantas comparações serão realizadas se o valor a ser buscado for **"{valor=1:10}"**?
      `,
      answer: function (vet, valor) {
        // Ordenar vetor usando Bubble Sort
        let sortedArray = BubbleSort(vet)

        for (let i = 0; i < sortedArray.length; i++) {
          if (sortedArray[i] == valor) return i + 1;
        }
        return sortedArray.length;
      },
      subject: 'busca',
      level: 1,
      tags: ['busca', 'busca otimizada', 'busca sequencial']
    },
  ],

  // Questões de Pilha
  pilha: [
    {
      id: 'pilha-simulacao-1',
      title: 'Pilha Simulação 1',
      text: `Se a seguinte sequência de operações é realizada com uma pilha: *{operacoes}*

Em qual ordem os elementos serão removidos da pilha?
<operacoes>
  <op value="1101100010">push({a=1:5}), push({b=1:5}), pop(), push({c=1:5}), push({d=1:5}), pop(), pop(), pop(), push({e=1:5}), pop()</op>
  <op value="1100110100">push({a=1:5}), push({b=1:5}), pop(), pop(), push({c=1:5}), push({d=1:5}), pop(), push({e=1:5}), pop(), pop()</op>
  <op value="1110010100">push({a=1:5}), push({b=1:5}), push({c=1:5}), pop(), pop(), push({d=1:5}), pop(), push({e=1:5}), pop(), pop()</op>
  <op value="1011011000">push({a=1:5}), pop(), push({b=1:5}), push({c=1:5}), pop(), push({d=1:5}), push({e=1:5}), pop(), pop(), pop()</op>
  <op value="1010110100">push({a=1:5}), pop(), push({b=1:5}), pop(), push({c=1:5}), push({d=1:5}), pop(), push({e=1:5}), pop(), pop()</op>
</operacoes>`,
      answer: function (operacoes, a, b, c, d, e) {
        let ops = operacoes.split('');
        let values = [e, d, c, b, a];
        let stack = [];
        let resp = [];
        for (let i = 0; i < ops.length; i++) {
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
      tags: ['pilha', 'pilha funcionamento', 'push', 'pop']
    },

    {
      id: 'pilha-2',
      title: 'Pilha Simulação 2',
      text: `
Considerando a função a seguir que recebe um número como argumento e utiliza a pilha S para processá-lo, o que será impresso quando fun(**{n=5:10}**) for chamado?

<pre><code>void fun(int n) {
  stack S; 
  while (n > 1) {
    push(&S, n%2);
      n = n/2;
  }

  while (!isEmpty(&S))
    printf("%d ", pop(&S));
}</pre></code>
        `,
      answer: function (n) {
        let stack = []
        // Armazenar o retorno de cada item removido da pilha que será usado para a resposta final da questão
        let poppedItems = []

        while (n > 1) {
          stack.push(n % 2)
          n = n / 2
        }

        while (stack.length) {
          poppedItems.push(stack.pop())
        }

        return poppedItems
      },
      subject: 'pilha',
      level: 1,
      tags: ['tags']
    },
  ],

  // Questões de Fila
  fila: [
    {
      id: 'fila-1',
      title: 'Fila 1',
      text: `
Se os elementos **[{vet=1:10:{3:6}}]** são adicionados a uma fila e são depois removidos da fila, em qual ordem eles serão removidos?
      `,
      answer: function (vet) {
        let inputArr = [...vet]// copiar o vetor
        let answer = []// resposta a ser retornada
        while (inputArr.length) {
          answer.push(inputArr.shift())
        }
        return answer
      },
      subject: 'fila',
      level: 1,
      tags: ['fila']
    },
  ]

};

