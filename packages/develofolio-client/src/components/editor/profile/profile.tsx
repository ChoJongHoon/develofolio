import React, { useCallback } from 'react'
import Image from 'next/image'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import { genereateProfileImagePath } from '~/lib/utils/generate-image-path'
import { Icon } from '~/components/base/icon'
import OpenColor from 'open-color'
import { useModal } from '~/components/base/modal/use-modal'
import { Modal } from '~/components/base/modal/modal'
import { Button } from '~/components/base/button'
import { useFileLoad } from '~/lib/hooks/use-file-load'
import axios from 'axios'
import {
	ImageUploadPathDocument,
	MyAvatarDocument,
	RemovePageAvatarDocument,
	UpdatePageAvatarDocument,
} from '~/graphql/typed-document-nodes.generated'
import { useUser } from '~/components/user/hooks/use-user'

export const Profile = () => {
	const client = useApolloClient()
	const user = useUser()
	const { data } = useQuery(MyAvatarDocument)

	const page = data?.page
	const avatar = page?.avatar

	const [isOpenDeleteModal, onOpenDeleteModal, onCloseDeleteModal] = useModal()

	const [removeMutation] = useMutation(RemovePageAvatarDocument, {
		onCompleted: () => {
			onCloseDeleteModal()
		},
	})

	const onClickRemove = useCallback(async () => {
		removeMutation()
	}, [removeMutation])

	const [updateMutation] = useMutation(UpdatePageAvatarDocument)
	const { onLoad } = useFileLoad({ accept: 'image/*' })

	const onClickUploadButton = useCallback(async () => {
		const file = await onLoad()

		if (!file) return
		const {
			data: {
				imageUploadPath: { filename, uploadPath },
			},
		} = await client.query({
			query: ImageUploadPathDocument,
			variables: {
				type: 'profile',
				filename: file.name,
			},
		})

		await axios.put(uploadPath, file, {
			headers: {
				'Content-Type': file.type,
			},
		})

		updateMutation({
			variables: {
				avatar: filename,
			},
		})
	}, [client, onLoad, updateMutation])

	if (!page || !user) {
		return <></>
	}

	return (
		<div css={container()}>
			{avatar ? (
				<>
					<Image
						css={imageStyles}
						src={genereateProfileImagePath(user.id, avatar)}
						layout="fill"
						objectFit="cover"
					/>
					<button css={deleteButton} onClick={onOpenDeleteModal}>
						<Icon type="TrashLine" color="white" size={16} />
					</button>
					<Modal
						title="사진을 삭제하시겠습니까?"
						open={isOpenDeleteModal}
						onClose={onCloseDeleteModal}
						action={
							<>
								<Button
									type="button"
									buttonProps={{ onClick: onCloseDeleteModal }}
									color="red"
									variant="outline"
								>
									취소
								</Button>
								<Button
									type="button"
									buttonProps={{
										onClick: onClickRemove,
									}}
									color="red"
								>
									삭제
								</Button>
							</>
						}
					/>
				</>
			) : (
				<>
					<button css={addButton} onClick={onClickUploadButton}>
						<Icon type="UserAddOutlined" size={64} color={OpenColor.gray[5]} />
					</button>
				</>
			)}
		</div>
	)
}

const container = () => css`
	position: relative;
	width: 100%;
	height: 100%;
	&:hover {
		.css-${imageStyles.name} {
			opacity: 0.7;
		}
		.css-${deleteButton.name} {
			opacity: 1;
		}
	}
`

const imageStyles = css`
	transition: opacity 0.2s;
`

const deleteButton = css`
	cursor: pointer;
	background-color: ${OpenColor.red[7]};
	border: none;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	position: absolute;
	top: 8px;
	right: 8px;
	transition: background-color 0.2s;
	padding: 0;
	&:hover {
		background-color: ${OpenColor.red[6]};
	}
	&:active {
		background-color: ${OpenColor.red[8]};
	}
`

const addButton = css`
	background-color: ${OpenColor.gray[1]};
	width: 100%;
	height: 100%;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.2s;
	&:hover {
		background-color: ${OpenColor.gray[2]};
	}
`
