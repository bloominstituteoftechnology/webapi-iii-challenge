const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/', routes);

app.get('/', (req, res) => {
    res.send('hello');
});

function errorHandler(err, req, res, next) {
	console.log(err);
	switch(err.statusCode){
		case 404:
			res.status(404).json({ 
				message: 'The requested information could not be found' 
			})
			break;
		default:
			res.status(500).json({
				message: 'There was an error performing the required operation'
			})
			break;
	}
}

app.use(errorHandler);

app.listen(9000, () => console.log('===server is running on port 9000==='));