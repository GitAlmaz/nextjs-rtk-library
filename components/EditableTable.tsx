import React, { useEffect, useState } from 'react'
import {
	Table,
	Input,
	Popconfirm,
	Form,
	Button,
	InputNumber,
	Select
} from 'antd'
import { useHookSelector } from '../hooks/hooks'
import { RootState } from '../store'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean
	dataIndex: string
	title: any
	inputType: 'number' | 'text' | 'select'
	record: Author
	index: number
	children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const authors = useHookSelector((state: RootState) => state.authors.list)
	const inputNode =
		inputType === 'number' ? (
			<InputNumber min={2015} />
		) : inputType === 'select' ? (
			<Select
				options={authors.map((author: Author) => ({
					label: author.first_name,
					value: author.key,
					title: author.first_name
				}))}
			/>
		) : (
			<Input />
		)

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`
						}
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	)
}
type EditableTableProps = {
	sourceColumns: any[]
	dataSource: any[]
	loading: boolean
	onEditSave(value): void
	onRemove(value): void
	onCellClick?(value: any): void
}
const EditableTable = ({
	sourceColumns,
	dataSource,
	loading,
	onEditSave,
	onRemove,
	onCellClick
}: EditableTableProps) => {
	const [form] = Form.useForm()
	const [data, setData] = useState(dataSource)
	const [editingKey, setEditingKey] = useState('')

	const isEditing = record => record.key === editingKey

	const edit = record => {
		event.stopPropagation()
		form.setFieldsValue({
			...record
		})
		setEditingKey(record.key)
	}

	const remove = record => {
		const filteredArr = data.filter(item => item.key !== record.key)
		setData(filteredArr)
		onRemove(record)
	}

	const cancel = e => {
		e.stopPropagation()
		setEditingKey('')
	}

	const save = async (key: React.Key) => {
		try {
			const row = await form.validateFields()
			const newData = [...data]
			const index = newData.findIndex(item => key === item.key)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row
				})
				console.log(row)
				setData(newData)
				onEditSave({
					...item,
					...row
				})
				setEditingKey('')
			} else {
				newData.push(row)
				setData(newData)
				setEditingKey('')
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
	}

	const cellClickHandler = (e, record) => {
		onCellClick(record)
	}

	const columns = [
		...sourceColumns,
		{
			title: 'Operation',
			dataIndex: 'operation',
			render: (_: any, record: Author) => {
				const editable = isEditing(record)
				return editable ? (
					<>
						<Button
							type='primary'
							onClick={() => save(record.key)}
							style={{ marginRight: 8 }}
						>
							Save
						</Button>
						<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
							<Button danger>Cancel</Button>
						</Popconfirm>
					</>
				) : (
					<>
						<Button
							type='ghost'
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
							style={{ marginRight: 8 }}
						>
							Edit
						</Button>
						<Popconfirm
							title='Sure to delete?'
							onConfirm={() => remove(record)}
						>
							<Button danger type='ghost' disabled={editingKey !== ''}>
								Delete
							</Button>
						</Popconfirm>
					</>
				)
			},
			editable: false
		}
	]

	useEffect(() => {
		setData(dataSource)
	}, [dataSource])

	const mergedColumns = columns.map(col => {
		if (!col.editable) {
			return col
		}
		return {
			...col,
			onCell: record => ({
				record,
				inputType: col.inputType,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record)
			})
		}
	})

	return (
		<Form form={form} component={false}>
			<Table
				loading={loading}
				components={{
					body: {
						cell: EditableCell
					}
				}}
				bordered
				dataSource={data}
				columns={mergedColumns}
				pagination={{
					onChange: cancel
				}}
			/>
		</Form>
	)
}

export default EditableTable
