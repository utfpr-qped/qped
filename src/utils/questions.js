/**
 * Lists of questions organized in one single object with each topic
 * 
 * TODO This list of questions works as dummy data, it needs to be replaced with the correct questions
 */
export const questions = {
  busca: [
    {
      id: 'busca-1',
      title: 'Questao de busca 1',
      text: `Considere o método de busca sequencial em um vetor contendo os elementos: **[{vet=2:23:+{5:10}}]**. 
  
  Qual deve ser o retorno da busca quando o usuário pesquisar pelo item **"{valor=2:23}"**?`,
      answer: function answer({ values, userInput }) {
        const { vet, valor } = values
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] === valor) return true;
        }
        return false;
      },
      subject: 'Busca',
      level: 1,
      tags: ['busca sequencial', 'busca']
    },
    {
      id: 'busca-2',
      title: 'Questao de busca 2',
      text: `Considere o método de busca sequencial em um vetor contendo os elementos: **[{vet=2:23:+{5:10}}]**. 
  
  Qual deve ser o retorno da busca quando o usuário pesquisar pelo item **"{valor=2:23}"**?`,
      answer: function answer(vet, valor) {
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] === valor) return i;
        }
        return -1;
      },
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

        // if the value is not in the array, then the correct answer is the size of the array + 1
        if (userInput === vet.length+1) return true;

        // if the user input doesn't apply to any of the cases above, it is incorrect
        return false;
      },
      subject: 'Busca',
      level: 1,
      tags: ['busca sequencial', 'busca']
    }
  ],
  pilha: [
    {
      id: 'pilha-1',
      title: 'Questao de pilha 1',
      text: `Considere o método de busca sequencial em um vetor contendo os elementos: ** [{ vet=2: 23: +{ 5: 10 } }] **. 
  
  Qual deve ser o retorno da busca quando o usuário pesquisar pelo item ** "{valor=2:23}" **? `,
      answer: function answer(vet, valor) {
        for (let i = 0; i < vet.length; i++) {
          if (vet[i] === valor) return i;
        }
        return -1;
      },
      subject: 'Pilha',
      level: 1,
      tags: ['pilha']
    }
  ]
  //,fila: []
}
