import db from '../../../utils/db'

export default async (req, res) => {
	try {
		const { collection } = req.query
		const entries = await db.collection(collection).get()
		const entriesData = entries.docs.map(entry => entry.data())
		console.log(entriesData)
	} catch (e) {
		res.status(400).end()
	}
}
