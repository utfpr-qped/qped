/* eslint-disable */
/*
  @autor: rivolli
  @date: 22-04-2020
  @version: 1.101
  @descrition
    Parsing the text of a programing question using variables

    Syntax used to define a dynamic variable in the text: {nome=valor}
    When the name is ommited, it is not possible to reuse the value of the variable
    When only the name is used, it uses the generated value of the variable, e.g. {nome}
    Value formats:
      - 1:10 - A number between 1 and 10
      - 1:10:5 - 5 numbers without replacement between 1 and 10
      - 1:10:+5 - 5 numbers with replacement between 1 and 10
      - 1:20,2 - 1 number between 1 and 20 using 2 as increment
      - 1:20,2:+3 - 3 numbers with replacement between 1 and 20 using 2 as increment
      - {1:5}:{=6:10} - 1 number varying between 1 and 5 until the value between 6 and 10
      - 1:30:{5:10} - Between 5 and 10 numbers without replacement between 1 and 30
      - {min}:{max}:3 - 3 numbers without replacement between the values of mim and max variables
    For array, it is possible to mention a specific position
      - {nome[2]}
      - {nome[{i}]} - using the value of another variable
      - {nome[{0:9:2}]} - more than one value
      - {nome[{j=3:9,3}]} - Defining a new variable to the index
      TODO - {cba[{i}]:xyz[{1:5}:4]} (mulitple positions in the same expression - this is not working currently)

      Additionally, it is possible to define blocks of codes using tags names
      Example:
      Mostrar umas das opções: {opcoes}
      <opcoes>
        <item>Instrução 1: {a=1:10}</item>
        <item>Instrução 2: {a=10:20}</item>
        <item>instruções 3 sem usar a</item>
        <item>instruções 4: {b=1:20}</item>
        <item>instruções 5 sem usar a e b</item>
        <item>instruções 6: {a=10:20} e {b=1:20}</item>
      </opcoes>

      Outra variação chamada Metodo: {metodo}
      <metodo>
        <sort value="bubble">Bolha</sort>
        <sort value="selection">Seleção</sort>
        <sort value="insertion">Inserção</sort>
      </metodo>
  @example:
    var text = `minha primeira variável é abc = {abc=1:20:1},
    já valores anonimos pode ser {=1:20,3}
    utlizando um escape \\{abc\\} = {abc}
    Criando um indice: {i=0:9}
    Multiplos valores, cba = {cba={1:10}:{20:30}:{1:10}}
    Acessando uma posição do vetor:
      [2] = {cba[2]} (posicao fixa)
      [i] = {cba[{i}]} (posicao seguindo outra variavel)
      2 valores = {cba[{0:9:2}]} (multiplos valores no indice)
      [j] = {cba[{j=3:9,3}]} (definindo uma variavel para o indice)
    Se utilizar um valor que não existe {teste}
    Se utilizar uma definição errada {a=30:1:1:2:3}`;

    let obj = new QuestionParser(text);
    console.log(obj.getText());

    //Retornando todos os valores nomeados
    console.log(obj.getAllValues());

    //Para obter valores diferentes (utiliza outros seeds)
    console.log(obj.getAllValues(2));

    // Para retornar o valor computado de uma variavel, é necessário informar seu nome
    console.log(obj.getValue("abc"));

    // Para obter a definição de uma variavel é necessário passar no formato de token
    console.log(obj.getVariable("{abc}"));
*/
export class QuestionParser {
  /*
      Create a question
      @param text:string - Question descrition using the notation of dynamic variables
  */
  constructor(text) {
    this.seed = null;  // This is not working as expected
    this.tokens = [];
    this.variables = {};
    this.values = {};
    this.options = {};

    //Options
    this.text = this.parseOptions(text);

    let getTokenId = this.getTokenId;
    this.tokens = this.tokenize(this.text).sort(function (a, b) {
      let ai = a.indexOf('=')
      let bi = b.indexOf('=')
      if (ai === -1 && bi == -1) {
        return a.localeCompare(b);
      } else if (ai !== -1 && bi !== -1) {
        if (b.indexOf(getTokenId(a)) > -1) {
          return -1;
        } else if (a.indexOf(getTokenId(b)) > -1) {
          return 1;
        } else {
          return a.length - b.length;
        }
      } else {
        if (ai == -1) return 1;
        return -1;
      }
    });

    this.tokens.forEach(token => this.getVariable(token));
    this.tokens.forEach(token => {
      this.getValue(this.getTokenId(token), this.seed);
    });
  }

  parseOptions(text) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString("<p_all>" + text + "</p_all>", "text/xml");
    let candidates = xmlDoc.getElementsByTagName("p_all")[0].children;

    for (let i = 0; i < candidates.length; i++) {
      let item = candidates[i];
      let variable = "{" + item.tagName + "}";
      if (text.indexOf(variable) > -1 && item.children.length > 0) {
        let option = this._getRandomInt(0, item.children.length - 1);
        let content = item.outerHTML;

        this.options[item.tagName] = option;
        for (let j = 0; j < item.children[option].attributes.length; j++) {
          if (item.children[option].attributes[j].name == "value") {
            this.options[item.tagName] = item.children[option].attributes[j].nodeValue;
          }
        }
        text = text.replace(variable, item.children[option].innerHTML);
        text = text.replace(content, "");
      }
    }

    return text;
  }

  /*
    Exctract the tokens (variables notations) from the text
    @param text:string - Question descrition using the notation of dynamic variables

    @return [] - List with all tokens found in the text
  */
  tokenize(text) {
    let tokens = [];
    let content = ""
    let aux = [];

    for (let i = 0; i < text.length; i++) {
      if (text[i] == '{') {
        if (content.length > 0) {
          aux.push(content);
        }
        content = '{';
      } else if (text[i] == '}') {
        content += '}';
        tokens.push(content);
        if (aux.length > 0) {
          content = aux.pop() + content;
        } else {
          content = "";
        }
      } else if (text[i] === '\\') {
        i++;
      } else if (text[i] == ' ') {
        aux = [];
        content = "";
      } else if (content.length > 0) {
        content += text[i];
      }
    }

    return tokens;
  }

  /*
  Parse values of a variable
  @param str:string - Value of a variable definition

  @return {} - An object with the keys:
    - min: minimum number of the range
    - max: maximum number of the range
    - step: step used to increment/decrement the values to create a range of values
    - length: size of the expected value
    - repeat: should sampling be with replacement?
    If input str is not valid the return is null
  */
  parseValues(str) {
    let parseSingleValue = function (num) {
      if (num.length > 0 && !isNaN(num)) {
        if (num.indexOf('.') != -1) {
          return parseFloat(num);
        } else {
          return parseInt(num);
        }
      } else {
        return num;
      }
    }

    let values = {};
    let vls = str.split(":");

    if (vls.length < 2) {
      return null;
    }

    //min
    values.min = parseSingleValue(vls[0]);

    //max and step
    let aux = vls[1].split(",")
    values.max = parseSingleValue(aux[0]);
    if (aux.length > 1) {
      if (aux.length == 2) {
        values.step = parseSingleValue(aux[1]);
      } else {
        return null;
      }
    } else {
      values.step = 1;
    }

    //length and repeat
    if (vls.length > 2) {
      if (vls.length == 3) {
        if (vls[2][0] == '+') {
          values.length = parseSingleValue(vls[2].substring(1));
          values.repeat = true;
        } else {
          values.length = parseSingleValue(vls[2]);
          values.repeat = false;
        }
      } else {
        return null;
      }
    } else {
      values.length = 1;
      values.repeat = false;
    }

    return values;
  }

  /*
    Extract from a token the name (id) of variable
    @param token:string - Text of a variable definition

    @return string - The name of the variable.
      If the variable is anonymous the name replace variable notation with '_',
      such that the return has only numbers and '_', e.g.: {1:5} => 1_2
  */
  getTokenId(token) {
    let compId = function (token) {
      let matched = token.match("\\[.*]");
      let symbols = ['+', ',', '{', '}', '=', ':'];
      for (let i = 0; i < symbols.length; i++) {
        token = token.replaceAll(symbols[i], '_');
      }
      if (matched != null) {
        let nmatched = token.match("\\[.*]");
        token = token.replace(nmatched[0], matched[0])
      }
      return token;
    }
    token = token.substring(1, token.length - 1);
    let bracket = 0;
    let pos;
    for (pos = 0; pos < token.length; pos++) {
      if (token[pos] == '[') bracket++;
      else if (token[pos] == ']') bracket--;
      else if (token[pos] == '=' && bracket == 0) break;
    }

    if (pos == 0) {
      return compId(token.substring(1));
    } else {
      return compId(token.substring(0, pos));
    }
  }

  /*
    Returns the complete object that representing a variables
    @param token:string - Text of a variable definition

    @return {} - An object with the keys:
    - id: name/id of the variable
    - min: minimum number of the range
    - max: maximum number of the range
    - step: step used to increment/decrement the values to create a range of values
    - length: size of the expected value
    - repeat: should sampling be with replacement?
    If token is not valid or the variable does not exist the return is undefined
  */
  getVariable(token) {
    let id = this.getTokenId(token);
    if (this.variables[id] === undefined) {
      //let ids = [];
      let tks = this.tokenize(token);
      if (tks.length == 1) {
        let obj = this.parseValues(tks[0].substring(1, tks[0].length - 1).replace(id, "").replace("=", ""));
        if (obj === null) {
          return;
        }

        obj.id = id;
        this.variables[id] = obj;
      } else {
        let obj = null;
        let ids = [];
        for (let i = 0; i < tks.length; i++) {
          let ntoken = tks[i];
          ids.push(this.getTokenId(ntoken));
          for (let j = 0; j < i; j++) {
            ntoken = ntoken.replace(tks[j], ids[j]);
          }
          obj = this.getVariable(ntoken);
        }
        this.variables[id] = obj;
      }
    }

    return this.variables[id];
  }

  /*
    Return the generated value of a variable
    @param varname:string - The name of a variable
    @param (optional) seed:integer - Number used to obtain always the same value of a variable
      If not provided, the default seed will be used

    @return integer or [] - A random value according to the variable definition
  */
  getValue(varname, seed) {
    let key = varname;
    if (this.options[key] !== undefined) {
      return this.options[key];
    }
    if (seed !== undefined && seed !== null) {
      key += seed;
    }

    if (this.values[key] === undefined) {
      let matched = varname.match("\\[.*]");
      if (matched !== null && matched.length == 1) {
        let idx = matched[0].substring(1, matched[0].length - 1);

        if (this._hasOnlyNumbers(idx)) {
          idx = parseInt(idx)
        } else {
          if (this.getVariable(idx) !== null) {
            idx = this.getValue(idx.substring(1, idx.length - 1))
          } else {
            //Definition of a Named Variable
          }
        }

        let values = this.getValue(varname.replace(matched[0], ""), seed);
        if (idx.length === undefined) {
          return values[idx];
        } else {
          let retvals = [];
          for (let i = 0; i < idx.length; i++) {
            retvals.push(values[idx[i]]);
          }
          return retvals;
        }
      }

      let obj = this.getVariable('{' + varname + '}');
      if (obj !== null && obj !== undefined) {
        let min = 0; let max = 1; let step = 2; let length = 3;
        let props = ['min', 'max', 'step', 'length'];

        let parsed = props.map((k) => {
          if (typeof obj[k] == 'number') {
            return obj[k];
          } else {
            let s = seed;
            if (obj[k].indexOf('_') > -1) {
              //Anonimous variables generates a random seed
              s = this._getRandomInt(0, 100);
            }
            return this.getValue(obj[k], s);
          }
        })

        let start = parsed[min];
        let end = parsed[max];
        let allvalues = [];
        if (parsed[step] > 0) {
          //TODO suppport char
          while (start <= end) {
            allvalues.push(start);
            start += parsed[step];
          }
        } else {
          while (start >= end) {
            allvalues.push(start);
            start += parsed[step];
          }
        }

        let used = [];
        let values = [];

        // it is required more values than it is possible to generate
        if (parsed[length] > allvalues.length && !obj.repeat) {
          parsed[length] = allvalues.length;
        }

        for (let i = 0; i < parsed[length]; i++) {
          let j = this._getRandomInt(0, allvalues.length - 1);
          while (!obj.repeat && used[j] !== undefined) {
            j = this._getRandomInt(0, allvalues.length - 1);
          }
          used[j] = 1;
          values.push(allvalues[j]);
        }

        if (parsed[length] == 1) {
          this.values[key] = values.pop();
        } else {
          this.values[key] = values;
        }
      }
    }
    return this.values[key];
  }

  /*
    Return the generated value of all named variables
    @param (optional) seed:integer - Number used to obtain always the same value of the variables
      If not provided, the default seed will be used

    @return {} - Each attribute is a named variable with its respective value
  */
  getAllValues(seed) {
    let tokens = this.tokens.sort((a, b) => b.length - a.length);
    let allvalues = tokens.map(token => {
      return this.getValue(this.getTokenId(token), seed);
    });

    let values = {};
    let ids = tokens.map(this.getTokenId);
    for (let i = 0; i < ids.length; i++) {
      if (ids[i].indexOf('_') == -1) {
        values[ids[i]] = allvalues[i];
      }
    }
    return values;
  }

  /*
    Gets the text of the question

    @return string - The parsed text
  */
  getText() {
    let text = this.text;
    let values = [["\\{", "{"], ["\\}", "}"]];

    (this.tokens.sort((a, b) => b.length - a.length))
      .reverse()
      .forEach(token => {
        values.push([token, this.getValue(this.getTokenId(token), this.seed)]);
        console.log(this.getValue(this.getTokenId(token, this.seed)))
      });




    while (values.length > 0) {
      let val = values.pop();
      let content = val[1];

      if (Array.isArray(val[1])) {
        content = val[1].join(", ");
      } else if (val[1] == undefined) {
        content = "";
      }

      text = text.replace(val[0], content);
    }
    return text;
  }

  _hasOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  _getRandomInt = function (min, max) {
    let a = Math.ceil(min);
    let b = Math.floor(max);
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
}
