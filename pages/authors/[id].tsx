import { useRouter } from "next/router"

export default function Author() {
	const { id } = useRouter().query
	return <h1>Authors page {id}</h1>
}
