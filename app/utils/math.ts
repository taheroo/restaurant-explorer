const calculateAverage = (numbers: number[]): number | null => {
	if (!numbers || numbers.length === 0) {
		return null;
	}

	const sum = numbers.reduce((a, b) => a + b, 0);
	const average = sum / numbers.length;
	return +average.toFixed(2); // Round to two decimal places
};

export { calculateAverage };