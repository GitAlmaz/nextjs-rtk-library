type AuthorsState = {
	loading: boolean
	list: Author[]
}
type BooksState = {
	loading: boolean
	list: Book[]
}
interface Author {
	key: string
	last_name: string
	first_name: string
}

type Book = {
	key: string
	title: string
	author_key: string
	created_at: number
	first_publish: number
}

type editableCols = {
	title: string
	dataIndex: string
	width?: string
	editable: boolean
	inputType: 'text' | 'number' | 'select'
	render?([key]: any, record: any): ReactNode
}
