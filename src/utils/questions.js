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
  // Questões de Busca
  busca: [
    // Retorna o index do primeiro valor encontrado e retorna -1 se não for encontrado. 
    {
      id: 'busca-1',
      title: 'Busca sequencial',
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
  //Questoes de Fila
  fila: [
    {
      id: 'fila-1',
      title: 'Ordem de remoção em uma fila',
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
      tags: ['ordem de remoção', 'fila']
    },
  ]
}
