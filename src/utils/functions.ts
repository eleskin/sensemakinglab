export const chunk = <T>(array: T[], size: number): T[][] => {
	const result: T[][] = [];
	
	for (let i: number = 0; i < Math.ceil(array.length / size); i++) {
		result.push(array.slice((i * size), (i * size) + size));
	}
	
	return result;
};
