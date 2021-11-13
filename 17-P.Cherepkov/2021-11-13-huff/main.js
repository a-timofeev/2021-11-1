function countFreqs () {
  const res = {}
  const src = document.getElementById('toEncode').value
  console.log(src)

  for (let i = 0; i < src.length; i++) {
    if (res[src[i]] === undefined) {
      res[src[i]] = 1
    } else {
      res[src[i]]++
    }
  }

  return res
}

function encodeMain () {
  const freqsDict = countFreqs()
  const freqs = document.getElementById('freqs')

  const symbols = Object.keys(freqsDict).map(function (key) {
    return [key, freqsDict[key]]
  })

  symbols.sort(function (first, second) {
    return second[1] - first[1]
  })

  freqs.innerHTML = JSON.stringify(symbols).replace('[[', '[\n[').replace(']]', ']\n]').replaceAll('],[', '], &nbsp &nbsp [').replaceAll('",', '", &nbsp').replaceAll('],', '').replaceAll(']', '').replaceAll('[', '')
}
