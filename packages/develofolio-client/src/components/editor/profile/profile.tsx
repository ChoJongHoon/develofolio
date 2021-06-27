import React, { useCallback } from 'react'
import Image from 'next/image'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
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
import { useStyletron } from 'styletron-react'
import { useHover } from '~/lib/hooks/use-hover'
import { padding, transitions } from 'polished'

export const Profile = () => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
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
		<div
			className={css({
				position: 'relative',
				width: '100%',
				height: '100%',
			})}
			ref={hoverRef}
		>
			{avatar ? (
				<>
					<Image
						className={css({
							...transitions(['opacity'], '0.2s'),
							opacity: isHovered ? 0.7 : 1,
						})}
						src={genereateProfileImagePath(user.id, avatar)}
						layout="fill"
						objectFit="cover"
						alt={user.name}
					/>
					<button
						className={css({
							cursor: 'pointer',
							backgroundColor: OpenColor.red[7],
							border: 'none',
							borderRadius: '50%',
							width: '24px',
							height: '24px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							opacity: isHovered ? 1 : 0,
							position: 'absolute',
							top: '8px',
							right: '8px',
							...transitions(['background-color'], '0.2s'),
							...padding('0px'),
							':hover': {
								backgroundColor: OpenColor.red[6],
							},
							':active': {
								backgroundColor: OpenColor.red[8],
							},
						})}
						onClick={onOpenDeleteModal}
					>
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
					<button
						className={css({
							backgroundColor: OpenColor.gray[1],
							width: '100%',
							height: '100%',
							border: 'none',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
							...transitions(['background-color'], '0.2s'),
							':hover': {
								backgroundColor: OpenColor.gray[2],
							},
						})}
						onClick={onClickUploadButton}
					>
						<Icon type="UserAddOutlined" size={64} color={OpenColor.gray[5]} />
					</button>
				</>
			)}
		</div>
	)
}
