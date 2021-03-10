import React, { ReactNode } from 'react'
import { Modal } from 'antd'

type CreateModalProps = {
	children: ReactNode
	title: string
	isModalVisible: boolean
	handleOk(): void
	handleCancel(): void
	okText: string
	cancelText: string
}

const CreateModal = ({
	children,
	title,
	isModalVisible,
	handleOk,
	handleCancel,
	okText,
	cancelText
}: CreateModalProps) => {
	return (
		<Modal
			title={title}
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText={okText}
			cancelText={cancelText}
		>
			{children}
		</Modal>
	)
}

export default CreateModal