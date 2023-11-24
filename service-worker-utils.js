var UUIDv4 = new function() {
	function generateNumber(limit) {
	   var value = limit * Math.random();
	   return value | 0;
	}
	function generateX() {
		var value = generateNumber(16);
		return value.toString(16);
	}
	function generateXes(count) {
		var result = '';
		for(var i = 0; i < count; ++i) {
			result += generateX();
		}
		return result;
	}
	function generateVariant() {
		var value = generateNumber(16);
		var variant =  (value & 0x3) | 0x8;
		return variant.toString(16);
	}
    // UUID v4
    //
    //   varsion: M=4 
    //   variant: N
    //   pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
    //
	this.generate = function() {
  	    var result = generateXes(8)
  	         + '-' + generateXes(4)
  	         + '-' + '4' + generateXes(3)
  	         + '-' + generateVariant() + generateXes(3)
  	         + '-' + generateXes(12)
  	    return result;
	};
};

export {UUIDv4}
