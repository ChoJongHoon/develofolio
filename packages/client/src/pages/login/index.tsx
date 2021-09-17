import { NextPage } from 'next'

const LoginPage: NextPage = () => {
	return (
		<div>
			<a href={`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/github`}>
				깃허브로 로그인
			</a>
			<br />
			<a href={`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/facebook`}>
				페이스북 로그인
			</a>
		</div>
	)
}

export default LoginPage
