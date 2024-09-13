/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let obj = {};
    let set = new Set(this.words);
    let arr = Array.from(set);
    for(let i = 0; i < arr.length; i++) {
      obj[arr[i]] = [];
      for(let j = 0; j < this.words.length; j++) {
        if(this.words[j] === arr[i]) {
          if(j+1 === this.words.length){
            obj[arr[i]].push(null);
            return obj;
          }else{
             obj[arr[i]].push(this.words[j+1])
          }
        }
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let obj = this.makeChains();
    console.log(obj)
    let keys = Object.keys(obj);
    let randomNum = Math.floor(Math.random() * keys.length)
    let key = keys[randomNum]
    let str = []
    str.push(key)

    while(str.length < numWords && obj[key] != null){
      
      str.push(obj[key][0])
      obj[key].shift()
      key = str[str.length - 1]
      
    }
      console.log("str:",str.join(' '))
      return str.join(' ')
    
  }
}

module.exports = {
  MarkovMachine,
}

// let mm = new MarkovMachine("the moon sometimes looks like an egg and sometimes looks like a banana")
// mm.makeText()

