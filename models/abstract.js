const mongoose = require('mongoose');
const config = require('../config');

const abstractSchema = new mongoose.Schema({
	titulo: {
		type: String,
		required: true,
	},
	texto: {
		type: String,
		required: true,
	},
	img: { type: String },
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const abstract = mongoose.model('abstract', abstractSchema);

module.exports = abstract;