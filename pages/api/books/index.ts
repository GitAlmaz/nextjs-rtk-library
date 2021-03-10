import db from '../../../utils/db'
export default async (req, res) => {
	try {
		switch (req.method) {
			case 'POST':
				const doc = await db.collection('books').doc(req.body.key)
				await doc.set({
					...req.body
				})
				res.status(200).end()
				break
			case 'PUT':
				break
			case 'GET':
				const entries = await db.collection('books').get()
				const entriesData = entries.docs.map(entry => ({
					key: entry.id,
					...entry.data()
				}))
				res.status(200).json(entriesData)
				break
			case 'DELETE':
				break
			default:
				break
		}
	} catch (e) {
		res.status(400).end()
	}
}
