import db from '../../../utils/db'

export default async (req, res) => {
	const { id } = req.query

	try {
		switch (req.method) {
			case 'PUT':
				await db
					.collection('entries')
					.doc(id)
					.update({
						...req.body,
						updated: new Date().toISOString()
					})
				break
			case 'GET':
				const doc = await db.collection('entries').doc(id).get()
				if (!doc.exists) {
					res.status(404).end()
				} else {
					res.status(200).json(doc.data())
				}
				break
			case 'DELETE':
				await db.collection('entries').doc(id).delete()
				break
			default:
				break
		}
		res.status(200).end()
	} catch (e) {
		res.status(400).end()
	}
}
