const { crawlPetrolimex } = require('../index');
const { delay } = require('../../utils/promise/delayTime/delay');

const petrolRunAll = async () => {
	// cron.schedule('*/3 * * * *', async () => {
	crawlPetrolimex();
	// });
};

module.exports = petrolRunAll;
