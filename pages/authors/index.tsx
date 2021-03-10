import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import CreateModal from '../../components/CreateModal'
import EditableTable from '../../components/EditableTable'
import { useHookDispatch, useHookSelector } from '../../hooks/hooks'
import { RootState } from '../../store'
import {
	addUser,
	editUser,
	getUsers,
	removeUser
} from '../../store/authors/authorsSlice'
import { v4 as uuidv4 } from 'uuid'

export default function Authors() {
	const dispatch = useHookDispatch()
	const {
		list: dataSource,
		loading
	}: { list: Author[]; loading: boolean } = useHookSelector(
		(state: RootState) => state.authors
	)
	const [form] = Form.useForm()
	const [modalVisible, setModalVisible] = useState(false)

	const sourceColumns: editableCols[] = [
		{
			title: 'Last name',
			dataIndex: 'last_name',
			width: '40%',
			editable: true,
			inputType: 'text'
		},
		{
			title: 'First name',
			dataIndex: 'first_name',
			width: '40%',
			editable: true,
			inputType: 'text'
		}
	]

	const handleOk = () => {
		form
			.validateFields()
			.then(values => {
				const author: Author = {
					key: uuidv4(),
					...values
				}
				dispatch(addUser(author))
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

	const editSaveHandler = value => {
		dispatch(editUser(value))
	}

	const removeHandler = (value: Author) => {
		dispatch(removeUser(value))
	}

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	return (
		<>
			<CreateModal
				isModalVisible={modalVisible}
				title='New author'
				handleOk={handleOk}
				handleCancel={handleToggleModal}
				okText='Create'
				cancelText='Cancel'
			>
				<Form name='createAuthor' form={form} size='small'>
					<Form.Item
						name='last_name'
						rules={[{ required: true, message: 'Field is required.' }]}
					>
						<Input placeholder='Last name' />
					</Form.Item>
					<Form.Item
						name='first_name'
						rules={[{ required: true, message: 'Field is required.' }]}
					>
						<Input placeholder='First name' />
					</Form.Item>
				</Form>
			</CreateModal>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Authors'
				subTitle='authors list'
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
			/>
		</>
	)
}
