function showMessage(){
  alert ("Put mark 5, please");
}

function Plane_Equations(obj) {
  var p0_x = 1*obj.p0x.value;
  var p0_y = 1*obj.p0y.value;
  var p0_z = 1*obj.p0z.value;
  var a = 1*obj.nx.value;
  var b = 1*obj.ny.value;
  var c = 1*obj.nz.value;
  
  var str_p0_x = obj.p0x.value;
  var str_p0_y = obj.p0y.value;
  var str_p0_z = obj.p0z.value;
  var str_a = obj.nx.value;
  var str_b = obj.ny.value;
  var str_c = obj.nz.value;
  
  var d = (-1) * (a * p0_x + b * p0_y + c * p0_z);
  obj.general_eq.value = str_a + "x + " + str_b + "y + " + str_c + "z + (" + String(d) + ") = 0";
  obj.normal_and_point_in_coord.value = "(x - " + str_p0_x + ")" + str_a + 
					" + (y - " + str_p0_y + ")" + str_b + 
					" + (z - " + str_p0_z + ")" + str_c + " = 0";
  if (a === 0 || b === 0 || c === 0 || d === 0) {obj.one_more_eq.value = "Does not exist";}
  else {
    var k = (-d) / a;
    var l = (-d) / b;
    var m = (-d) / c;
    obj.one_more_eq.value = "(x / " + String(k) + ") + (y / " + String(l) + ") + (z / " + String(m) + ") = 1";
  }                  	
}

function div(val, by){
    return (val - val % by) / by;
}

function num_of_different_prime_dividers(obj) {
  var x = 1*obj.num.value;
  var MAXN = 1000;
  if (x > MAXN) {obj.cnt.value = "x is too big, more than 1000";}
  else {
    var erathosphene_arr = new Array(MAXN);
    for (var i = 2; i < MAXN; i++) {
      erathosphene_arr[i] = 0; 
    }
    for (var i = 2; i < MAXN; i++) {
      if (erathosphene_arr[i] === 0) {
        for (var j = i * i; j < MAXN; j += i) {
          erathosphene_arr[j] = 1;
        }
      }
    }
    let primes = new Array();
    for (var i = 2; i < MAXN; i++) {
      if (erathosphene_arr[i] === 0) {
        primes.push(i);
      }
    }
    var cnt = 0;
    for (var j = 0; j < primes.length; j++) {
      if (x % primes[j] == 0) {
        cnt++;
	while(x % primes[j] == 0) {
          x = div(x, primes[j]);
	}
      }
    }
    obj.cnt.value = String(cnt);
  }
}
