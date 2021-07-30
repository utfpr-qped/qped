module.exports = {
  sortingAlgorithms: [
    {
      id: 'ordenacao-método-bolha',
      subject: 'Algoritmos de ordenação',
      text: `
Quantas trocas são necessárias para que a sequência 
\`\`\`
{sequencia=1:10:{6:10}}
\`\`\` 

seja ordenada pelo método:
\`\`\`
{metodo}
\`\`\`
<metodo>
  <item value="bubbleSort1">
  void bubbleSort(int arr[], int n) \\{
    int i, j;
    for (i=0; i &lt; n-1; i++)\\{
      for(j=1; j &lt; n-i; j++) \\{
        if (arr[j-1] &gt; arr[j]) \\{
          troca(&amp;arr[j], &amp;arr[j-1]);
        \\}
      \\}
    \\}
  \\}
  </item>
  <item value="bubbleSort2">
  void bubbleSort(int arr[], int n)\\{
    int i, j;
    for (i=0; i &lt; n-1; i++)\\{
      for(j=1; j &lt; n-i; j++) \\{
        if (arr[j-1] &lt; arr[j]) \\{
          troca(&amp;arr[j], &amp;arr[j-1]);
        \\}
      \\}
    \\}
  \\}
  </item>
  <item value="bubbleSort3">
  void bubbleSort(int arr[], int n)\\{
    int i, j;
    for (i=0; i &lt; n-1; i++)\\{
      for(j=n; j &gt; i; j++) \\{
        if (arr[j-1] &gt; arr[j]) \\{
          troca(&amp;arr[j], &amp;arr[j-1]);
        \\}
      \\}
    \\}
  \\}
  </item>
  <item value="bubbleSort4">
  void bubbleSort(int arr[], int n)\\{
    int i, j;
    for (i=0; i &lt; n-1; i++)\\{
      for(j=n; j &gt; i; j++) \\{
        if (arr[j] &gt; arr[j-1]) \\{
          troca(&amp;arr[j], &amp;arr[j-1]);
        \\}
      \\}
    \\}
  \\}
  </item>
</metodo>
      `,
      answer: function (values, blocks) {
        const arr = [...values.sequencia]
        const metodo = blocks.metodo
        const resp = []
        
        let troca = function(vet, i, j) {
          let aux = vet[i];
          vet[i] = vet[j];
          vet[j] = aux;
        }

        let fncs = {
          'bubbleSort1': function(arr, n) {
            let i, j, t=0;
            for (i=0; i < n-1; i++){
              for(j=1; j < n-i; j++){
                if (arr[j-1] > arr[j]){
                  t++;
                  troca(arr, j-1, j);
                }
              }
            }
            return t;
          },

          'bubbleSort2': function(arr, n) {
            let i, j, t=0;
            for (i=0; i < n-1; i++){
              for(j=1; j < n-i; j++){
                if (arr[j-1] < arr[j]){
                  t++;
                  troca(arr, j-1, j);
                }
              }
            }
            return t;
          },

          'bubbleSort3': function(arr, n) {
            let i, j, t;
            t=0;
            for (i=0; i < n-1; i++){
              for(j=n; j > i; j--){
                if (arr[j-1] > arr[j]){
                  t++;
                  troca(arr, j-1, j);
                }
              }
            }
            return t;
          },

          'bubbleSort4': function(arr, n) {
            let i, j, t;
            t=0;
            for (i=0; i < n-1; i++){
              for(j=n; j > i; j--){
                if (arr[j] > arr[j-1]){
                  t++;
                  troca(arr, j-1, j);
                }
              }
            }
            return t;
          }
        };

        resp.push(fncs[metodo](arr, arr.length));
        return resp;
      },
      level: 2,
      keywords: ['bubble-sort', 'ordenação', 'trocas', 'teste de mesa']
    },
    {
      id: 'ordenação-método-seleção',
      subject: 'Algoritmos de ordenação',
      text: `
Quantas trocas são necessárias para que a sequência 
\`\`\`
{sequencia=1:10:{6:10}}
\`\`\` 

seja ordenada pelo método:
\`\`\`
{metodo}
\`\`\`      <metodo>
  <item value="selectionSort1">
  void selection(int vet[], int n) \\{
    int i, j, x;
    for (i=0; i &lt; n-1; i++) \\{
      x = i;
      for (j=i+1; j &lt; n; j++) \\{
        if (vet[j] &lt; vet[x]) \\{
          x = j;
        \\}
        if (x != i) \\{
          troca(&amp;vet[x], &amp;vet[i]);
        \\}
      \\}
    \\}
  \\}
  </item>
  <item value="selectionSort2">
  void selection(int vet[], int n) \\{
    int i, j, x;
    for (i=0; i &lt; n-1; i++) \\{
      x = i;
      for (j=i+1; j &lt; n; j++) \\{
        if (vet[j] &gt; vet[x]) \\{
          x = j;
        \\}
        if (x != i) \\{
          troca(&amp;vet[x], &amp;vet[i]);
        \\}
      \\}
    \\}
  \\}
  </item>
</metodo>
      `,
      answer: function (values, blocks) {
        const arr = [...values.sequencia]
        const metodo = blocks.metodo
        const resp = []
        
        let troca = function(vet, i, j) {
          let aux = vet[i];
          vet[i] = vet[j];
          vet[j] = aux;
        }

        let fncs = {
          'selectionSort1': function(arr, n) {
            let i, j, x, t;
            t=0;
            for (i=0; i < n-1; i++){
              x = i;
                for(j=i+1; j<n; j++){
                  if (arr[j] < arr[x]) {
                    x = j;
                }	
              }
              if (x != i) {
              t++;
                  troca(arr, x, i);
              }
            }
            return t;
          },

          'selectionSort2': function(arr, n) {
            let i, j, x, t;
            t=0;
            for (i=0; i < n-1; i++){
              x = i;
                for(j=i+1; j<n; j++){
                  if (arr[j] > arr[x]) {
                    x = j;
                }	
              }
              if (x != i) {
              t++;
                  troca(arr, x, i);
              }
            }
            return t;
          }
        };

        resp.push(fncs[metodo](arr, arr.length));
        return resp;
      },
      level: 2,
      keywords: ['selection-sort', 'ordenação', 'trocas', 'teste de mesa']
    },
    {
      id: 'ordenação-método-inserção',
      subject: 'Algoritmos de ordenação',
      text: `
Quantas trocas são necessárias para que a sequência 
\`\`\`
{sequencia=1:10:{6:10}}
\`\`\` 

seja ordenada pelo método:
\`\`\`
{metodo}
\`\`\`      
<metodo>
  <item value="insertionSort1">
  void insertion(int vet[], int n) \\{
    int i, j;
    for (i=1; i &lt; n; i++) \\{
      for (j=i; j &gt; 0 &amp;&amp; vet[j] &lt; vet[j-1]; j--) \\{
        troca(&amp;vet[j-1], &amp;vet[j]);
      \\}
    \\}
  \\}
  </item>
  <item value="insertionSort2">
  void insertion(int vet[], int n) \\{
      int i, j;
      for (i=1; i &lt; n; i++) \\{
        for (j=i; j &gt; 0 &amp;&amp; vet[j-1] &lt; vet[j]; j--) \\{
          troca(&amp;vet[j-1], &amp;vet[j]);
        \\}
      \\}
    \\}
  \\}
  </item>
  <item value="insertionSort3">
  void insertion(int vet[], int n) \\{
  	int i, j;
  	for (i = 1; i &lt; n; i++) \\{
      j = i - 1;
      while (j &gt;= 0 &amp;&amp; vet[j] &gt; vet[j+1]) \\{
          troca(vet[j], vet[j+1]);
          j = j - 1;
      \\}
    \\}
  \\}
  </item>
</metodo>
      `,
      answer: function (values, blocks) {
        const arr = [...values.sequencia]
        const metodo = blocks.metodo
        const resp = []
        
        let troca = function(vet, i, j) {
          let aux = vet[i];
          vet[i] = vet[j];
          vet[j] = aux;
        }

        let fncs = {
          'insertionSort1': function(arr, n) {
            let i, j, t;
            t=0;
            for (i=1; i<n; i++) {
              for (j=i; j>0 && arr[j]<arr[j-1]; j--) {
              t++;
                  troca(arr, j-1, j);
              }
            }
            return t;
          },

          'insertionSort2': function(arr, n) {
            let i, j, t;
            t=0;
            for (i=1; i<n; i++) {
              for (j=i; j>0 && arr[j-1]<arr[j]; j--) {
              t++;
                  troca(arr, j-1, j);
              }
            }
            return t;
          },

          'insertionSort3': function(arr, n) {
            let i, j, t;
            t=0;
            for (i = 1; i < n; i++) {
              j = i - 1;
              while (j >= 0 && arr[j] > arr[j+1]) {
                t++;
                troca(arr, j, j+1);
                j = j - 1;
              }
            }
            return t;
          }
        };

        resp.push(fncs[metodo](arr, arr.length));
        return resp;
      },
      level: 2,
      keywords: ['insertion-sort', 'ordenação', 'trocas', 'teste de mesa']
    },
    {
      id: 'ordenação-método-quicksort',
      subject: 'Algoritmos de ordenação',
      text: `
Considerando que o método quick-sort seja aplicado para ordenar o conjunto de dados a seguir
\`\`\`
{sequencia=1:20:{10:13}}
\`\`\` 

Considerando que na primeira iteração, o valor {sequencia[{pivo=1:9}]} = **{sequencia[{pivo}]}** / {pivo} é o pivô escolhido.
Qual será sua posição após a primeira iteração?
      `,
      answer: function (values, blocks) {
        const arr = [...values.sequencia]
        const pivo = values.pivo
        const resp = []

        let c = 0;
        for (let i = 0; i<arr.length; i++) {
          if (arr[i] < arr[pivo]) c++;
        }
        if (c == 0)
          resp.push(0)
        else
          resp.push(c - 1);

        return resp;
      },
      level: 2,
      keywords: ['quick-sort', 'ordenação']
    },
  ],
  searchingAlgorithms: [
    {
      id: 'busca-sequencial-comparação',
      subject: 'Algoritmos de busca',
      text: `
Suponha que você está realizando uma busca sequencial no vetor: \`[{vet=3:13:+{6:11}}]\`

Quantas comparações serão realizadas se o valor buscado for **{valor=3:13}**?
      }`,
      answer: function (values) {
        const { vet, valor } = values
        let answer = []// resposta a ser retornada

        for (let i = 0; i < vet.length; i++) {
          if (vet[i] == valor) {
            answer.push(i + 1)
            return answer
          }
        }

        answer.push(vet.length) 
        return answer
      },
      level: 1,
      keywords: ['busca sequencial', 'busca']
    },
    {
      id: 'busca-sequencial-retorno',
      subject: 'Algoritmos de busca',
      text: `Considere o método de busca sequencial em um vetor contendo os elementos: \`[{vet=2:23:+{5:10}}]\` 
      
Qual deve ser o retorno da busca quando o usuário pesquisar pelo item **{valor=2:23}**?
      `,
      // Retorna o index do primeiro valor encontrado e retorna -1 se não for encontrado. 
      answer: function (values) {
        const { vet, valor } = values
        let answer = []

        for (let i = 0; i < vet.length; i++) {
          if (vet[i] == valor) {
            answer.push(i)
            return answer
          }
        }

        answer.push(-1)
        return answer
      },
      level: 1,
      keywords: ['busca sequencial', 'busca']
    },
    {
      id: 'busca-sequencial-otimizada',
      subject: 'Algoritmos de busca',
      text: `
Suponha que seja feita uma busca sequencial otimizada no vetor a seguir, o qual deve ser ordenado antes da busca. 
\`\`\`
[{vet=1:10:{5:10}}]
\`\`\` 
Quantas comparações serão realizadas se o valor a ser buscado for **{valor=1:10}**?
    `,
      answer: function (values) {
        const { vet, valor } = values
        const answer = []

        const BubbleSort = originalArray => {
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

        // Ordenar vetor usando Bubble Sort
        let sortedArray = BubbleSort(vet)

        // Realizar busca sequencial no vetor ordenado
        for (let i = 0; i < sortedArray.length; i++) {
          if (sortedArray[i] == valor) {
            answer.push(i + 1)
            return answer
          }
        }

        answer.push(sortedArray.length)
        return answer
      },
      level: 1,
      keywords: ['busca', 'busca otimizada', 'busca sequencial']
    }
  ],
  stack: [
    {
      id: 'pilha-div',
      subject: 'Pilha estática e dinâmica',
      text: `
Considerando a função a seguir que recebe dois valores como argumentos e utiliza a pilha S para processá-los.

O que será impresso quando **fun({n=6:12}, {d=2:5})** for chamado?
\`\`\`
void fun(int n, int d) {
  stack S; 
  while (n >= 1) {
    push(&S, n%d);
    n = n/d;
  \\}
  while (!isEmpty(&S))
    printf("%d ", pop(&S));
\\}
\`\`\`
`,
      answer: function (values) {
        let n = parseInt(values.n)
        let d = parseInt(values.d)
        let stack = []

        let poppedItems = []

        while (n >= 1) {
          stack.push(n % d)
          n = parseInt(n / d)
        }
        
        while (stack.length) {
          poppedItems.push(stack.pop())
        }

        return poppedItems
      },
      level: 1,
      keywords: ['pilha', 'simulação', 'teste de mesa']
    },
    {
      id: 'pilha-op',
      subject: 'Pilha estática e dinâmica',
      text: `
Se a seguinte sequência de operações é realizada com uma pilha: 
\`\`\`
{sequencia}
\`\`\`

Em qual ordem os elementos serão removidos da pilha?

<sequencia>
  <item value="1">
  push({a=1:3}), push({b=1:3}), pop(), push({c=1:3}), push({d=1:3}), pop(), pop(), pop(), push({e=1:3}), pop()
  </item>
  <item value="2">
  push({a=1:3}), pop(), push({b=1:3}), push({c=1:3}), pop(), push({d=1:3}), pop(), pop(), push({e=1:3}), pop()
  </item>
  <item value="3">
  push({a=1:3}), pop(), push({b=1:3}), pop(), push({c=1:3}), push({d=1:3}), pop(), push({e=1:3}), pop(), pop()
  </item>
  <item value="4">
  push({a=1:3}), pop(), push({b=1:3}), push({c=1:3}), push({d=1:3}), pop(), push({e=1:3}), pop(), pop(), pop()
  </item>
  <item value="4">
  push({a=1:3}), push({b=1:3}), push({c=1:3}), pop(), push({d=1:3}), pop(), pop(), push({e=1:3}), pop(), pop()
  </item>
</sequencia>
`,
      answer: function (values, options) {
        let a = parseInt(values.a)
        let b = parseInt(values.b)
        let c = parseInt(values.c)
        let d = parseInt(values.d)
        let e = parseInt(values.e)
        let item = parseInt(options.sequencia)
        let stack = []

        let poppedItems = []
        switch(item) {
          case 1:
            stack.push(a); stack.push(b); poppedItems.push(stack.pop()); stack.push(c); stack.push(d); poppedItems.push(stack.pop()); poppedItems.push(stack.pop()); poppedItems.push(stack.pop()); stack.push(e); poppedItems.push(stack.pop());
            break;
          case 2:
            stack.push(a); poppedItems.push(stack.pop()); stack.push(b); stack.push(c); poppedItems.push(stack.pop()); stack.push(d); poppedItems.push(stack.pop()); poppedItems.push(stack.pop()); stack.push(e); poppedItems.push(stack.pop());
            break;
          case 3:
            stack.push(a); 
            poppedItems.push(stack.pop());
            stack.push(b); 
            poppedItems.push(stack.pop());
            stack.push(c); 
            stack.push(d);
            poppedItems.push(stack.pop());
            stack.push(e);
            poppedItems.push(stack.pop());
            poppedItems.push(stack.pop());
            break;
          case 4:
            stack.push(a); 
            poppedItems.push(stack.pop());
            stack.push(b); 
            stack.push(c); 
            stack.push(d);
            poppedItems.push(stack.pop());
            stack.push(e);
            poppedItems.push(stack.pop());
            poppedItems.push(stack.pop());
            poppedItems.push(stack.pop());
            break;
          case 5:
            stack.push(a); 
            stack.push(b); 
            stack.push(c); 
            poppedItems.push(stack.pop());
            stack.push(d);
            poppedItems.push(stack.pop());
            poppedItems.push(stack.pop());
            stack.push(e);
            poppedItems.push(stack.pop());
            poppedItems.push(stack.pop());
            break;
        }
        
        return poppedItems
      },
      level: 1,
      keywords: ['pilha', 'simulação', 'teste de mesa']
    }
  ],
  queue: [
    {
      id: 'fila-básico',
      subject: 'Fila estática e dinâmica',
      text: `Se os elementos abaixo são adicionados a uma fila e são depois removidos da fila, em qual ordem eles serão removidos? \`[{vet=1:10:{3:6}}]\``,
      answer: function (values) {
        const { vet } = values
        let inputArr = [...vet]// copiar o vetor
        let answer = []// resposta a ser retornada
        while (inputArr.length) {
          answer.push(inputArr.shift())
        }
        return answer
      },
      level: 1,
      keywords: ['ordem de remoção', 'fila']
    },
    {
      id: 'fila-pilha',
      subject: 'Fila estática e dinâmica',
      text: `
Considerando a função f a seguir, qual será a nova ordem da fila se a função f for chamada recebendo a fila **[{vet=1:10:{3:6}}]**?
\`\`\`
  void f(queue *q)\\{
    int aux;
    stack *s = criaStack();  

    while (!isEmpty(q)) \\{
      aux = dequeue(q);
      if (aux % 2 == 1)
        push(s, aux);
      else
        enqueue(q, aux+1);
    \\}

    while (!isEmpty(s)) \\{
      enqueue(q, pop(s));
    \\}
  \\}
\`\`\`
      `,
      answer: function (values) {
        const { vet } = values
        let inputArr = [...vet]// copiar o vetor
        let stack = []
        
        while (inputArr.length) {
          let aux = inputArr.shift()
          if (aux % 2) stack.push(aux)
          else inputArr.push(aux + 1)
        }

        stack.reverse();
        return stack;
      },
      level: 2,
      keywords: ['ordem de remoção', 'fila', 'pilha']
    },
  ],
  linkedList: [
    {
      id: 'lista-add-node',
      subject: 'Lista encadeada',
      text: `
A lista duplamente encadeada **l** possui os seguintes elementos:
\`\`\`
{lista=1:10:5}
\`\`\`
Sabendo que a função **addNode** cria e insere um novo nó entre os nós **ant** e **prox** que são recebidos por parâmetro.
\`\`\`
node *addNode(node *ant, int valor, node *prox) {
  ...
\\}
\`\`\`
Qual a nova sequência da lista, após a execução das seguintes instruções?
\`\`\`    
int a = {a=1:10}, b = {b=1:10}, c = {c=1:10}, d = {d=1:10};

{parte1}
{parte2}
{parte3}
\`\`\`  
<parte1>
  <item value="a">novo = addNode(l-&gt;first, a, l-&gt;first-&gt;prox);</item>
  <item value="b">novo = addNode(NULL, a, l-&gt;first);</item>
  <item value="c">novo = addNode(l-&gt;first-&gt;prox, a, getNode(l, {lista[2]}));</item>
</parte1>  
<parte2>
  <item value="a">addNode(novo-&gt;ant, b, novo);</item>
  <item value="b">addNode(novo, b, novo-&gt;prox);</item>
</parte2>
<parte3>
  <item value="a">addNode(addNode(l-&gt;last-&gt;ant, c, l-&gt;last), d, l-&gt;last);</item>
  <item value="b">aux = l-&gt;last;
addNode(aux, c, addNode(l-&gt;last, d, NULL));</item>
</parte3>
      `,
      answer: function (values, options) {
        let { lista, a, b, c, d } = values
        let _lista = [...lista]
        let op1 = options.parte1;
        let op2 = options.parte2;
        let op3 = options.parte3;

        // Simulate a Doubly Linked List behaviour using an Array

        // Simulate first instruction => addNode(l→first, "a", l→first→prox);
        let pos;
        switch(op1) {
          case 'a': 
            pos = 1; break;
          case 'b': 
            pos = 0; break;
          case 'c': 
            pos = 2; break;
        }
        _lista.splice(pos, 0, a); 

        switch(op2) {
          case 'a': _lista.splice(pos, 0, b);   break;
          case 'b': _lista.splice(pos+1, 0, b); break;
        }
        
        switch(op2) {
          case 'a': 
          _lista.splice(_lista.length - 1, 0, c);
          _lista.splice(_lista.length - 1, 0, d);
          break;
          case 'b':
          _lista.push(c);
          _lista.push(d);
          break;
        }
       
        return _lista
      },
      level: 2,
      keywords: ['lista', 'lista duplamente encadeada']
    },
    {
      id: 'lista-rec',
      subject: 'Lista encadeada',
      text: `
Considere que a lista l possui os elementos **{vet=1:5:+6}**, nesta exata ordem. O que será impresso pela chamada: **f(l->first)**;
Considerando que a função f possui a seguinte implementação:
\`\`\`
void f(node *n) \\{
  if(n == NULL) \\{
    return;
  \\}
  {codigo}
\\}
\`\`\`  
<codigo>
  <item value="a">printf("%d", n-&gt;info); 
  if(n-&gt;prox != NULL) \\{
    f(n-&gt;prox-&gt;prox);
  \\}
  printf("%d", n-&gt;info);</item>
  <item value="d">printf("%d", n-&gt;info); 
  if(n-&gt;prox != NULL) \\{
    f(n-&gt;prox);
  \\}</item>
  <item value="e">if(n-&gt;prox != NULL) \\{
    f(n-&gt;prox);
  \\}
  printf("%d", n-&gt;info);</item>
</codigo>`,
      answer: function (values, options) {
        let lista = values.vet
        let vet = [...lista]
        let opt = options.codigo
        let answer = "";
        
        answer = vet[0] + "" + vet[2] + vet[4] + vet[4] + vet[2] + vet[0];
        switch(opt) {
          case 'a': 
            answer = vet[0] + "" + vet[2] + vet[4] + vet[4] + vet[2] + vet[0];
             break;
          case 'b': 
            answer = vet[0] + "" + vet[2] + vet[4] + vet[5] + vet[3] + vet[1];
             break;
          case 'c': 
            answer = vet[1] + "" + vet[3] + vet[5] + vet[4] + vet[2] + vet[0];
             break;
          case 'd': 
            answer = vet[0] + "" + vet[1] + vet[2] + vet[3] + vet[4] + vet[5];
            break;
          case 'e': 
            answer = vet[5] + "" + vet[4] + vet[3] + vet[2] + vet[1] + vet[0];
            break;
        }
        
        return [answer]
      },
      level: 2,
      keywords: ['lista', 'lista encadeada', 'recursão']
    }
  ],
  tree: [
    {
      id: 'árvore-bin-prop',
      subject: 'Árvore binária',
      text: `
Em uma árvore binária de altura **{height=3:15}**, qual {target} que esta árvore pode ter?
<target>
  <item value="folhas">o número máximo de folhas</item>
  <item value="nos">o número máximo de nós</item>
</target>
`,
      answer: function (values, options) {
        let altura  = values.height
        let target = options.target
        let answer = []
        switch (target) {
          case "folhas": answer.push(2**altura); break;
          case "nos": answer.push(2**(altura+1)-1); break;
        }
        return answer
      },
      level: 1,
      keywords: ['árvore binária', 'propriedades', 'folhas', 'nós']
    },
    {
      id: 'árvore-bin-nos',
      subject: 'Árvore binária',
      text: `
Sabendo que uma árvore binária possui **{num=3:500}** nós que podem ser dispostos de qualquer maneira.
Qual é a menor altura possível para esta árvore?
`,
      answer: function (values, options) {
        let num  = values.num
        let answer = []
        let i = 1;
        let total = 2**(i+1) - 1
        while(num > total) {
          i++;
          total = 2**(i+1) - 1
        }
        answer.push(i);
        return answer
      },
      level: 2,
      keywords: ['árvore binária', 'propriedades', 'folhas', 'nós']
    },
    {
      id: 'árvore-bin-percurso',
      subject: 'Árvore binária',
      text: `
Considerando que a árvore binária a seguir foi criada a partir do vetor **[{nums=1:8:8}]**:
\`\`\`
         {tree}
\`\`\`

Qual é a sequência do percurso em **{ordem}** nesta árvore?

<ordem>
  <item value="pre">pré-ordem</item>
  <item value="em">em-ordem</item>
  <item value="pos">pós-ordem</item>
</ordem>
<tree>
  <item value="1">{nums[0]}
     /       \\
    {nums[1]}         {nums[2]}
 /     \\    /    \\
{nums[3]}       {nums[4]}  {nums[5]}      {nums[6]}
       /  
      {nums[7]}</item>
   <item value="2">{nums[0]}
     /       \\
    {nums[1]}         {nums[2]}
     \\      /   \\
      {nums[3]}    {nums[4]}     {nums[5]}
     /    /  
    {nums[6]}    {nums[7]}</item>
   <item value="3">{nums[0]}
     /       \\
    {nums[1]}          {nums[2]}
     \\       /   \\
      {nums[3]}     {nums[4]}     {nums[5]} 
             \\   / 
              {nums[6]} {nums[7]}</item>
</tree>
`,
      answer: function (values, options) {
        let nums  = [...values.nums]
        let ordem = options.ordem
        let tree = options.tree
        let itens = []
        
        switch(ordem) {
          case "pre":
            if (tree == 1)
              itens = [0, 1, 3, 4, 7, 2, 5, 6];
            else if (tree == 2)
              itens = [0, 1, 3, 6, 2, 4, 7, 5];
            else if (tree == 3)
              itens = [0, 1, 3, 2, 4, 6, 5, 7];
            break;
          case "em":
            if (tree == 1)
              itens = [3, 1, 7, 4, 0, 5, 2, 6];
            else if (tree == 2)
              itens = [1, 6, 3, 0, 7, 4, 2, 5];
            else if (tree == 3)
              itens = [1, 3, 0, 4, 6, 2, 7, 5];
            break;
          case "pos":
            if (tree == 1)
              itens = [3, 7, 4, 1, 5, 6, 2, 0];
            else if (tree == 2)
              itens = [6, 3, 1, 7, 4, 5, 2, 0];
            else if (tree == 3)
              itens = [3, 1, 6, 4, 7, 5, 2, 0];
            break;
        }

        let answer = [];
        for (let i = 0; i<nums.length; i++) {
          answer.push(nums[itens[i]]);
        }
        
        return answer
      },
      level: 2,
      keywords: ['árvore binária', 'percurso']
    },
    {
      id: 'árvore-bin-func',
      subject: 'Árvore binária',
      text: `
Seja a variável t um ponteiro para a árvore binária criada a partir do vetor **[{nums=1:9:+8}]**:
\`\`\`
         {tree}
\`\`\`

Qual é o resultado da chamada **f(t)**, considerando a função f a seguir
\`\`\`
  {funcao}
\`\`\`

<funcao>
  <item value="somafolha">int f(node *n) \\{
    if (n == NULL) return 0;
    if (isLeaf(n)) return info(n);
  
    return f(left(n)) + f(right(n));
  \\}</item>
  <item value="somapaifolha">int f(node *n) \\{
    if (n == NULL) return 0;
    if (isLeaf(left(n)) || isLeaf(right(n))) return info(n);
  
    return f(left(n)) + f(right(n));
  \\}</item>
  <item value="somanaofolha">int f(node *n) \\{
    if (n == NULL) return 0;
    if (isLeaf(n)) return 0;
  
    return f(left(n)) + f(right(n)) + info(n);
  \\}
  </item>
  <item value="somatodos">int f(node *n) \\{
    if (n == NULL) return 0;
  
    return f(left(n)) + f(right(n)) + info(n);
  \\}
  </item>
  <item value="somaum">int f(node *n) \\{
    if (n == NULL) return 0;
    if (isLeaf(n)) return 0;
    if (left(n) == NULL || right(n) == NULL) return info(n);
  
    return f(left(n)) + f(right(n));
  \\}
  </item>
  <item value="somadois">int f(node *n) \\{
    int t = 0;
    if (n == NULL) return 0;
    if (isLeaf(n)) return 0;
    if (left(n) != NULL &amp;&amp; right(n) != NULL) t = info(n);
  
    return f(left(n)) + f(right(n)) + t;
  \\}
  </item>
</funcao>
<tree>
  <item value="1">{nums[0]}
     /       \\
    {nums[1]}         {nums[2]}
 /     \\    /    \\
{nums[3]}       {nums[4]}  {nums[5]}      {nums[6]}
       /  
      {nums[7]}</item>
   <item value="2">{nums[0]}
     /       \\
    {nums[1]}         {nums[2]}
     \\      /   \\
      {nums[3]}    {nums[4]}     {nums[5]}
     /    /  
    {nums[6]}    {nums[7]}</item>
   <item value="3">{nums[0]}
     /       \\
    {nums[1]}          {nums[2]}
     \\       /   \\
      {nums[3]}     {nums[4]}     {nums[5]} 
             \\   / 
              {nums[6]} {nums[7]}</item>
</tree>
`,
      answer: function (values, options) {
        let nums  = [...values.nums]
        let tree = parseInt(options.tree)
        let func = options.funcao
        let resp = {}
        let answer = []

        switch (tree) {
          case 1:
            resp = {
              somafolha: nums[3] + nums[7] + nums[5] + nums[6],
              somapaifolha: nums[1] + nums[2],
              somanaofolha: nums[0] + nums[1] + nums[2] + nums[4],
              somaum: nums[4],
              somadois: nums[0] + nums[1] + nums[2]
            }
            break;
          case 2:
            resp = {
              somafolha: nums[6] + nums[7] + nums[5],
              somapaifolha: nums[3] + nums[2],
              somanaofolha: nums[0] + nums[1] + nums[2] + nums[3] + nums[4],
              somaum: nums[1] + nums[3] + nums[4],
              somadois: nums[0] + nums[2]
            }
            break;
          case 3:
            resp = {
              somafolha: nums[3] + nums[6] + nums[7],
              somapaifolha: nums[1] + nums[4] + nums[5],
              somanaofolha: nums[0] + nums[1] + nums[2] + nums[4] + nums[5],
              somaum: nums[1] + nums[4] + nums[5],
              somadois: nums[0] + nums[2]
            }
            break;
        }
        resp["somatodos"] = nums.reduce((total, numero) => total + numero, 0);
          
        answer.push(resp[func]);
        return answer
      },
      level: 3,
      keywords: ['árvore binária', 'teste de mesa']
    },
  ],
  btree: [
    {
      id: 'árvore-busca-altura',
      subject: 'Árvore binária de busca',
      text: `
Dado que os números são inseridos em uma árvore binária de busca na respectiva ordem: \`\`\`{nums=1:20:+{6:10}}\`\`\`.
Qual será a altura da árvore resultante?
`,
      answer: function (values, options) {
        let vet  = values.nums
        let answer = []
        let tree = null

        function btinsert(tree, val) {
          if (tree == null)
            return {
              info: val, left: null, right: null
            }
        
          if (val < tree.info) {
            tree.left = btinsert(tree.left, val);
          } else {
            tree.right = btinsert(tree.right, val);
          }
          return tree;
        }

        let altura = 0;
        function height(tree, level) {
          if (tree == null) return altura;
          if (tree.left == null && tree.right == null) {
            if (level > altura)
              altura = level;
            return altura;
          }

          height(tree.left, level + 1);
          height(tree.right, level + 1);
          return altura;
        }

        for (let i = 0; i < vet.length; i++) {
          tree = btinsert(tree, vet[i]);
        }
        
        answer.push(height(tree, 0));

        return answer
      },
      level: 2,
      keywords: ['árvore binária de busca', 'criação']
    },
    {
      id: 'árvore-busca-percurso',
      subject: 'Árvore binária de busca',
      text: `
Suponha que os seguintes números \`\`\`{nums=1:9:9}\`\`\` foram inseridos nesta ordem em uma árvore binária de busca. 
Qual é o resultado do percurso de **{percurso}** nesta árvore?
<percurso>
  <item value="pre">pré-ordem</item>
  <item value="pós">pós-ordem</item>
</percurso>
`,
      answer: function (values, options) {
        let vet  = values.nums
        let answer = []
        let tree = null

        function btinsert(tree, val) {
          if (tree == null)
            return {
              info: val, left: null, right: null
            }
        
          if (val < tree.info) {
            tree.left = btinsert(tree.left, val);
          } else {
            tree.right = btinsert(tree.right, val);
          }
          return tree;
        }

        for (let i = 0; i < vet.length; i++) {
          tree = btinsert(tree, vet[i]);
        }

        let func;
        if (options.percurso == "pre") {
          func = function(tree) {
            if (tree != null) {
              answer.push(tree.info);
              func(tree.left);
              func(tree.right);
            }
          }
        } else {
          func = function(tree) {
            if (tree != null) {
              func(tree.left);
              func(tree.right);
              answer.push(tree.info);
            }
          }
        }
        
        func(tree);
        return answer
      },
      level: 2,
      keywords: ['árvore binária de busca', 'criação', 'percurso']
    },
    {
      id: 'árvore-busca-delete',
      subject: 'Árvore binária de busca',
      text: `Considerando que uma árvore binária de busca é construída utilizando a seguinte sequência de números:
\`\`\`{nums=1:20:8}\`\`\`

Qual será a soma de todas as folhas da árvore se o nó com valor **{nums[{i=0:7}]}** for removido?
`,
      answer: function (values, options) {
        let vet  = values.nums
        let num = vet[values.i]
        let answer = []
        let tree = null

        function btinsert(tree, val) {
          if (tree == null)
            return {
              info: val, left: null, right: null
            }
        
          if (val < tree.info) {
            tree.left = btinsert(tree.left, val);
          } else {
            tree.right = btinsert(tree.right, val);
          }
          return tree;
        }

        function soma(tree) {
          if (tree == null) return 0;
          if (tree.left == null && tree.right == null) return tree.info;
          return soma(tree.left) + soma(tree.right);
        }

        function busca(tree, key) {
          if (tree == null || tree.info == key)
            return tree;
          if (key < tree.info)
            return busca(tree.left, key);
          else
            return busca(tree.right, key);
        }

        function father(tree, node) {
          if (tree == null) return null;
          if (tree.left == node || tree.right == node) return tree;
          
          let p1 = father(tree.left, node);
          if (p1 != null) return p1;
          return father(tree.right, node); 
        }

        function deleteNode(tree, val) {
          let n = busca(tree, val);
          let p = father(tree, n);
          if (p == null) {
            return deleteRoot(n);
          }
        
          if (p.left == n) {
            p.left = deleteRoot(n);
          } else {
            p.right = deleteRoot(n);
          }
        
          return tree;
        }

        function deleteRoot(tree) {
          let n, p;
          if (tree.left == null) {
            n = tree.right;
          } else {
            n = tree.left;
            while(n.right != null) {
               n = n.right;
            }
        
            p = father(tree, n)
            if (p != tree) {
              p.right = n.left;
              n.left = tree.left;
            }
            n.right = tree.right;
          }

          return n;
        }

        for (let i = 0; i < vet.length; i++) {
          tree = btinsert(tree, vet[i]);
        }
        
        tree = deleteNode(tree, num);
        answer.push(soma(tree));

        return answer
      },
      level: 3,
      keywords: ['árvore binária de busca', 'exclusão', 'folhas']
    },
    {
      id: 'árvore-busca-print',
      subject: 'Árvore binária de busca',
      text: `Considerando a função a seguir:
\`\`\`      
  int contador = 0; //Variavel global
  void print(node *n, int k) \\{
      {codigo}
  \\}
\`\`\`
      
E a árvore binária de busca gerada pelos números:
\`\`\`{nums=1:15:10}\`\`\`

Qual é o resultado da chamada **print(raiz, {a=2:3})**?
<codigo>
  <item value="a">if (n != NULL &amp;&amp; contador &lt;= k) \\{
        print(n-&gt;right, k);
        contador++;
        if (contador == k)
          printf("%d", n-&gt;info);
        print(n-&gt;left, k);
      \\}</item>
  <item value="b">if (n != NULL &amp;&amp; contador &lt;= k) \\{
        print(n-&gt;left, k);
        contador++;
        if (contador == k)
          printf("%d", n-&gt;info);
        print(n-&gt;right, k);
      \\}</item>
  <item value="a">if (n != NULL &amp;&amp; contador &lt;= k) \\{
        print(n-&gt;right, k);
        if (contador == k)
          printf("%d", n-&gt;info);
        contador++;
        print(n-&gt;left, k);
      \\}</item>
  <item value="b">if (n != NULL &amp;&amp; contador &lt;= k) \\{
        print(n-&gt;left, k);
        if (contador == k)
          printf("%d", n-&gt;info);
        contador++;       
        print(n-&gt;right, k);
      \\}</item>
</codigo>
`,
      answer: function (values, options) {
        let vet  = values.nums
        let a = values.a
        let answer = []
        let tree = null

        function btinsert(tree, val) {
          if (tree == null)
            return {
              info: val, left: null, right: null
            }
        
          if (val < tree.info) {
            tree.left = btinsert(tree.left, val);
          } else {
            tree.right = btinsert(tree.right, val);
          }
          return tree;
        }

        let contador = 0;
        let prt = null;
        switch(options.codigo) {
          case 'a':
            prt = function (n, k) {
              if (n != null && contador <= k) {
                prt(n.right, k);
                contador++;
                if (contador == k)
                  answer.push(n.info);
                  prt(n.left, k);
              }
            }
            break;
          case 'b':
            prt = function (n, k) {
              if (n != null && contador <= k) {
                prt(n.left, k);
                contador++;
                if (contador == k)
                  answer.push(n.info);
                  prt(n.right, k);
              }
            }
            break;
          case 'c':
            prt = function (n, k) {
                if (n != null && contador <= k) {
                  prt(n.right, k);
                  if (contador == k)
                    answer.push(n.info);
                  contador++;
                  prt(n.left, k);
                }
                return resp;
              }
              break;
          case 'd':
            prt = function (n, k) {
                if (n != null && contador <= k) {
                  prt(n.left, k);
                  if (contador == k)
                    answer.push(n.info);
                  contador++;
                  prt(n.right, k);
                }
              }
              break;
        }
        
        for (let i = 0; i < vet.length; i++) {
          tree = btinsert(tree, vet[i]);
        }
        
        prt(tree, a);
        return answer
      },
      level: 3,
      keywords: ['árvore binária de busca', 'teste de mesa', 'percurso', 'recursividade']
    },
  ]
}
