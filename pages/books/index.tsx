import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, PageHeader, Select } from 'antd'
import React, { ReactEventHandler, useEffect, useState } from 'react'
import CreateModal from '../../components/CreateModal'
import EditableTable from '../../components/EditableTable'
import { useHookDispatch, useHookSelector } from '../../hooks/hooks'
import { RootState } from '../../store'
import { v4 as uuidv4 } from 'uuid'
import { addBook, editBook, getBooks, removeBook } from '../../store/books/booksSlice'
import { getUsers } from '../../store/authors/authorsSlice'
import Link from 'next/link'

export default function Books() {
	const dispatch = useHookDispatch()
	const authors = useHookSelector((state: RootState) => state.authors.list)
	const {
		list: dataSource,
		loading
	}: { list: Book[]; loading: boolean } = useHookSelector(
		(state: RootState) => state.books
	)
	const [form] = Form.useForm()
	const [modalVisible, setModalVisible] = useState(false)

	const sourceColumns: editableCols[] = [
		{
			title: 'Title',
			dataIndex: 'title',
			editable: true,
			inputType: 'text',
			render: (_, record) => {
				return <Link href={`/books/${record.key}`}>{record.title}</Link>
			}
		},
		{
			title: 'Author',
			dataIndex: 'author_key',
			editable: true,
			inputType: 'select',
			render: (_, record) => {
				const author = authors.find(
					(author: Author) => author.key === record.author_key
				)
				if (author) return <span>{author.first_name}</span>
				return <span>{record.author_first_name}</span>
			}
		},
		{
			title: 'First publish',
			dataIndex: 'first_publish',
			editable: true,
			inputType: 'number'
		}
	]

	const handleOk = () => {
		form
			.validateFields()
			.then(values => {
				console.log(values)
				const book: Book = {
					key: uuidv4(),
					...values
				}
				dispatch(addBook(book))
				handleToggleModal()
			})
			.catch(e => {
				console.log(e)
			})
	}

	const handleToggleModal = () => {
		setModalVisible(!modalVisible)
		form.resetFields()
	}

	const editSaveHandler = (value: Book) => {
		dispatch(editBook(value))
	}

	const removeHandler = (value: Book) => {
		dispatch(removeBook(value))
	}

	const cellClickHandler = value => {
		console.log(value)
	}
	useEffect(() => {
		dispatch(getBooks())
		dispatch(getUsers())
	}, [dispatch])

	return (
		<>
			<CreateModal
				isModalVisible={modalVisible}
				title='New book'
				handleOk={handleOk}
				handleCancel={handleToggleModal}
				okText='Create'
				cancelText='Cancel'
			>
				<Form name='createBook' form={form} size='small'>
					<Form.Item
						name='author_key'
						rules={[{ required: true, message: 'Field is required.' }]}
					>
						<Select
							placeholder='Author'
							options={authors.map((author: Author) => ({
								label: author.first_name,
								value: author.key,
								title: author.first_name
							}))}
						/>
					</Form.Item>
					<Form.Item
						name='title'
						rules={[{ required: true, message: 'Field is required.' }]}
					>
						<Input placeholder='Title' />
					</Form.Item>
					<Form.Item
						name='first_publish'
						rules={[{ required: true, message: 'Field is required.' }]}
					>
						<InputNumber placeholder='First publish' min={2015} />
					</Form.Item>
				</Form>
			</CreateModal>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Books'
				subTitle='books list'
				extra={[
					<Button
						key='1'
						type='primary'
						icon={<UserAddOutlined />}
						onClick={handleToggleModal}
					>
						Add
					</Button>
				]}
			/>
			<EditableTable
				sourceColumns={sourceColumns}
				dataSource={dataSource}
				loading={loading}
				onEditSave={editSaveHandler}
				onRemove={removeHandler}
				onCellClick={cellClickHandler}
			/>
		</>
	)
}

