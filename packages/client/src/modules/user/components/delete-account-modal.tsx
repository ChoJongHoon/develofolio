import { useMutation } from '@apollo/client'
import { Button } from 'baseui/button'
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalProps,
} from 'baseui/modal'
import { useSnackbar } from 'baseui/snackbar'
import OpenColor from 'open-color'
import { Icon } from '~/components/icon'
import { DeleteAccountDocument } from '~/graphql/document.generated'
import { useLogout } from '../hooks/use-logout'

interface DeleteAccountModalProps extends ModalProps {}

export const DeleteAccountModal = ({
	onClose,
	...props
}: DeleteAccountModalProps) => {
	const { enqueue } = useSnackbar()

	const [logout] = useLogout()

	const [deleteAccount, { loading }] = useMutation(DeleteAccountDocument, {
		onCompleted: async () => {
			enqueue({
				message: '탈퇴되었습니다.',
				startEnhancer: () => (
					<Icon type="Verified" color={OpenColor.green[6]} size={24} />
				),
			})
			await logout()
		},
	})

	return (
		<Modal onClose={onClose} {...props}>
			<ModalHeader>회원 탈퇴</ModalHeader>
			<ModalBody>
				포트폴리오를 포함한 모든 회원정보가 사라지며 되돌릴 수 없습니다.
			</ModalBody>
			<ModalFooter>
				<Button
					kind="secondary"
					overrides={{
						BaseButton: {
							style: {
								marginRight: '16px',
							},
						},
					}}
					onClick={() => onClose?.({ closeSource: 'closeButton' })}
				>
					취소
				</Button>
				<Button
					isLoading={loading}
					onClick={() => {
						deleteAccount()
					}}
					overrides={{
						BaseButton: {
							style: {
								backgroundColor: OpenColor.red[7],
								':hover': {
									backgroundColor: OpenColor.red[6],
								},
								':active': {
									backgroundColor: OpenColor.red[5],
								},
							},
						},
					}}
				>
					탈퇴
				</Button>
			</ModalFooter>
		</Modal>
	)
}
