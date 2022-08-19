module.exports = () => {
	const data = { users: [] };
	let count = 0;
	for (let i = 0; i < 1000; i++) {
		const date = new Date();
		
		date.setDate(date.getDate() + count);
		
		count += 1;
		
		data.users.push({
			id: i,
			title: `user${Math.round(Math.random() * 1000 - i)}`,
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ${i}`,
			completed: !Math.round(Math.random()),
			date: date,
			author: `Author #${Math.round(i / 100)}`,
		});
	}
	return data;
};
