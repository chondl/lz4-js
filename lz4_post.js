

  ;(function() {
    var bufferLen = 8388608,
        srcBuffer = Module['allocate'](bufferLen,'i8',Module['ALLOC_STATIC']),
        dstBuffer = Module['allocate'](bufferLen,'i8',Module['ALLOC_STATIC'])

    function _compress(src) {
      var i, 
          srcLength = src.length, 
          heap = Module['HEAPU8'],
          rsltLen,
          rslt

      for(i=0;i<srcLength;i++) heap[srcBuffer+i] = src[i]
      rsltLen = Module['_LZ4_compress'](srcBuffer, dstBuffer, srcLength)
      rslt = new src.constructor(rsltLen)
      for(i=0;i<rsltLen;i++) rslt[i] = heap[dstBuffer+i]
      return rslt
    }

    exports['compress'] = function(src) {
      if (src.length > bufferLen) throw new Error('source length out of bounds')
      return _compress(src)
    }

    function _decompress(src) {
      var i, 
          srcLength = src.length, 
          heap = Module['HEAPU8'],
          rsltLen,
          rslt

      for(i=0;i<srcLength;i++) heap[srcBuffer+i] = src[i]
      rsltLen = Module['_LZ4_uncompress_unknownOutputSize'](srcBuffer, dstBuffer, srcLength, bufferLen)
      if (rsltLen > 0) {
        rslt = new src.constructor(rsltLen)
        for(i=0;i<rsltLen;i++) rslt[i] = heap[dstBuffer+i]
      }
      return rslt
    }

    exports['uncompress'] = function(src) {
      var rslt
      if (src.length > bufferLen) throw new Error('source length out of bounds')
      rslt = _decompress(src)
      if (!rslt) throw new Error('decompression error')
      return rslt
    }
  })()

})(typeof exports === 'undefined' ? this['lz4']={} : exports)
;
