import db from '../../../utils/db'

export default async (req, res) => {
	const { id } = req.query
	try {
		switch (req.method) {
			case 'POST':
				await db
					.collection('books')
					.doc(id)
					.set({
						...req.body
					})
				break
			case 'GET':
				const doc = await db.collection('books').doc(id).get()
				if (!doc.exists) {
					res.status(404).end()
				} else {
					res.status(200).json(doc.data())
				}
				break
			case 'DELETE':
				await db.collection('books').doc(id).delete()
				res.status(200)
				break
			default:
				break
		}
		res.status(200).end()
	} catch (e) {
		res.status(400).end()
	}
}
