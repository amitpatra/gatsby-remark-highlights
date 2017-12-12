module.exports = str => {
	let newStr = str;
	if (newStr.split('{').length > 1) {
		// This could be an object
		newStr = newStr.substring(newStr.indexOf('{') + 1).slice(0, -1); // correct: nop
		// Split the newStr :
		return `{"${newStr.substring(0, newStr.indexOf(':')).trim()}":${objectify(
			newStr.substring(newStr.indexOf(':') + 1)
		)}}`;
	}

	return newStr;
};
