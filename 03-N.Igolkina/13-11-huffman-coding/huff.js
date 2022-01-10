class Node{
  constructor(value, char, right, left){
    this.value = value;
    this.char = char;
    this.right = right;
    this.left = left;
  }
}

function find_freq(str){
  res = [];
  res.push([str[0], 1])
  for (i = 1; i < str.length; i++){
    was = 0;
    for (j = 0; j < res.length; j++){
      if (str[i] == res[j][0]){
        res[j][1]++;
        was++;
      }
    }
    if (was == 0){
      res.push([str[i], 1])
    }
  }
  return res
}

class Tree {
  constructor(str){
    let freq = find_freq(str);
    this.freq = freq;
    this.tree = this.build_tree();
    let codes = this.create_code(this.tree);
    this.codes = codes;
    let binary = this.binary(codes, str);
    this.binary = binary;
    let binary_with_sp = this.binary_with_sp(codes, str);
    this.binary_with_sp = binary_with_sp;
  }
  build_tree(){
    let all = []
    for (i = 0; i < this.freq.length; i++) {
        let node = new Node(this.freq[i][1], this.freq[i][0]);
        all.push(node);
    }
    let to_rem = [];
    while(all.length != 1){
      all.sort((a, b) => {
        return a.value - b.value;
      });

      let node = new Node(all[0].value + all[1].value, '');
      to_rem.push(all[0]);
      to_rem.push(all[1]);
      node.left = to_rem[to_rem.length - 2];
      node.right = to_rem[to_rem.length - 1];
      all = all.slice(2);
      all.push(node);
    }
    return all[0];
  }
  create_code(tree){
    let codes = new Map();
    function findcode (node, code) {
        if (!node.left && !node.right) {
          codes.set(node.char, code);
          return;
        }
        if (node.left && !node.left.left && !node.left.right){
          codes.set(node.left.char, code + '0');
        }
        if (node.right && !node.right.left && !node.right.right){
          codes.set(node.right.char, code + '1');
        }
        if(node.left){
          findcode(node.left, code + '0');
        }
        if(node.right){
          findcode(node.right, code + '1');
        }
    }
    findcode(tree, '');
    return codes;
  }
  binary(codes, str) {
    let result = new String();
    for(let i = 0; i < str.length; i++){
      result += codes.get(str[i]);
    }
    return result;
  }
  binary_with_sp(codes, str) {
    let result = new String();
    for(let i = 0; i < str.length; i++){
      result += codes.get(str[i]);
      result += " ";
    }
    return result;
  }
}


function decode(str, revcodes, res){
  let fits = revcodes;
  for (let i = 0; i < str.length; i++) {
    if (fits.size == 1) {
      fits.forEach (function(value, key) {
      })
      res += fits.get(str.slice(0, i));
      return decode(str.slice(i), revcodes, res);
    }
    else {
      let tmp = new Map();
      fits.forEach (function(value, key) {
        if (key.slice(0, i + 1) == str.slice(0, i + 1)) {
          tmp.set(key, value);
        }
      })
      fits = tmp;
    }
  }
  res += fits.get(str);
  return res;
}

function find_coef(str1, str2) {
  let res = str1.length / str2.length;
  return res;
}

function to_code() {
  let str = document.getElementById("str").value;
  let tree = new Tree(str);
  let res_codes = "";
  let codes = tree.codes;
  codes.forEach (function(value, key) {
    res_codes += key + ' --> ' + value + '<br>';
  })

  document.getElementById("a").innerHTML = res_codes;
  let coded = tree.binary;
  let coded_with_sp = tree.binary_with_sp;
  let revcodes = new Map();
  codes.forEach (function(value, key) {
    revcodes.set(value, key);
  })
  let res = '';
  let result = decode(coded, revcodes, res);
  document.getElementById("b").innerHTML = coded ;
  document.getElementById("b").innerHTML += "<br>" + coded_with_sp;
  document.getElementById("c").innerHTML = result;

  let binary_code = '';
  for (k = 0; k < str.length; k++) {
    binary_code += str[k].charCodeAt(0).toString(2);
  }

  let binary_codesp = '';
  for (k = 0; k < str.length; k++) {
    binary_codesp += str[k].charCodeAt(0).toString(2) + " ";
  }

  document.getElementById("d").innerHTML = binary_code;
  document.getElementById("d").innerHTML += "<br>" + binary_codesp;
  let coef = find_coef(binary_code, coded);
  document.getElementById("e").innerHTML = coef;
}
