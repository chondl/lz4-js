var util = require('util'),
    fs = require('fs'),
    lz4 = require('./lz4.js')


src = fs.readFileSync(process.argv[2])

for(i=0;i<10;i++) {
start = process.hrtime()
rslt = lz4.compress(src)
diff = process.hrtime(start)
console.log('compress took %d milliseconds', Math.round((diff[0] * 1e9 + diff[1]) / 1000 / 1000))

start = process.hrtime()
rslt = lz4.uncompress(rslt)
diff = process.hrtime(start)
console.log('uncompress took %d milliseconds', Math.round((diff[0] * 1e9 + diff[1]) / 1000 / 1000))
}
