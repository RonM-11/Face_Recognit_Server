const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'e11f08324eb647w 5r23 yuk  vmbnm vd5a69bee6e7d273b7e'
});

const handleApiCall = (db) => (req, res) => {
	console.log('req.body.input', req.body.input)
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	}) .catch (err => res.status(400).json('Unable to work with Api'));
}
const handleImage = (db) => (req, res) => {1
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}