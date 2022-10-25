const crawlAllDetailStock = async (model, crawlDetailCallback) => {
	const list = await model.find({}).limit(30);

	list.forEach(async (stock, index) => {
		setTimeout(() => {
			crawlDetailCallback(
				stock.name,
				stock.symbol,
				stock.reference,
				stock.ceil,
				stock.floor
			);
		}, 7000 * index);
	});
};

module.exports = { crawlAllDetailStock };
