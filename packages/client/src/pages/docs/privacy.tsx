import { NextPage } from 'next'
import Head from 'next/head'
import { BasicLayout } from '~/layouts/basic-layout'
import { Grid, Cell } from 'baseui/layout-grid'
import {
	HeadingXLarge,
	HeadingXXLarge,
	ParagraphMedium,
} from 'baseui/typography'
import { styled } from 'baseui'

const PrivacyPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>개인정보 처리 방침</title>
			</Head>
			<Grid>
				<Cell span={[4, 6, 10]} skip={[0, 1, 1]}>
					<H1>개인정보 처리 방침</H1>
					<Paragraph>
						<em>
							&lt; 디벨로폴리오 &gt;(&quot;https://develofolio.com&quot;이하
							&quot;디벨로폴리오&quot;)
						</em>
						는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
						이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
						다음과 같이 개인정보 처리방침을 수립·공개합니다.
					</Paragraph>
					<H2>제1조(개인정보의 처리목적)</H2>
					<Paragraph>
						&lt; 디벨로폴리오 &gt;가 개인정보 보호법 제32조에 따라 등록․공개하는
						개인정보파일의 처리목적은 다음과 같습니다.
					</Paragraph>
					<Ol>
						<Li>개인정보 파일명 : SNS계정을 이용한 회원가입</Li>
						<Li>개인정보의 처리목적 : 회원가입, 서비스 이용 등</Li>
						<Li>수집방법 : 회원가입</Li>
						<Li>보유근거 : 개인정보보호법제15조 (정보주체의 동의)</Li>
						<Li>보유기간 : 회원탈퇴시까지</Li>
						<Li>관련법령 : </Li>
					</Ol>
					<H2>제2조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)</H2>
					<Ol>
						<Li>
							정보주체는 디벨로폴리오에 대해 언제든지 개인정보
							열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
						</Li>
						<Li>
							제1항에 따른 권리 행사는디벨로폴리오에 대해 「개인정보 보호법」
							시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을
							통하여 하실 수 있으며 디벨로폴리오는 이에 대해 지체 없이
							조치하겠습니다.
						</Li>
						<Li>
							제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자
							등 대리인을 통하여 하실 수 있습니다. 이 경우 &quot;개인정보 처리
							방법에 관한 고시(제2020-7호)&quot; 별지 제11호 서식에 따른
							위임장을 제출하셔야 합니다.
						</Li>
						<Li>
							개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
							제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
						</Li>
						<Li>
							개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
							대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
						</Li>
						<Li>
							디벨로폴리오는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구,
							처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
							대리인인지를 확인합니다.
						</Li>
					</Ol>
					<H2>제3조(처리하는 개인정보의 항목 작성)</H2>
					<Paragraph>
						<em>&lt; 디벨로폴리오 &gt;</em>는 다음의 개인정보 항목을 처리하고
						있습니다.
					</Paragraph>
					<Paragraph>&lt; SNS계정을 이용한 회원가입 &gt;</Paragraph>
					<Ul>
						<Li>필수항목 : 이메일, 로그인ID, 이름</Li>
						<Li>선택항목 : 프로필 사진</Li>
					</Ul>
					<H2>제4조(개인정보의 파기)</H2>
					<Ol>
						<Li>
							<em>&lt; 디벨로폴리오 &gt;</em>는 개인정보 보유기간의 경과,
							처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
							개인정보를 파기합니다.
						</Li>
						<Li>
							정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
							달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속
							보존하여야 하는 경우에는, 해당 개인정보를 별도의
							데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
						</Li>
						<Li>
							개인정보 파기의 절차 및 방법은 다음과 같습니다.
							<br />
							1. 파기절차
							<br />
							<em>&lt; 디벨로폴리오 &gt;</em>는 파기 사유가 발생한 개인정보를
							선정하고, <em>&lt; 디벨로폴리오 &gt;</em> 의 개인정보 보호책임자의
							승인을 받아 개인정보를 파기합니다.
							<br />
							2. 파기방법
							<br />
							전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
							사용합니다
						</Li>
					</Ol>
					<H2>제5조(개인정보의 안전성 확보 조치)</H2>
					<Paragraph>
						<em>&lt; 디벨로폴리오 &gt;</em>는 개인정보의 안전성 확보를 위해
						다음과 같은 조치를 취하고 있습니다.
					</Paragraph>
					<Ol>
						<Li>
							개인정보 취급 직원의 최소화 및 교육
							<br />
							개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여
							개인정보를 관리하는 대책을 시행하고 있습니다.
						</Li>
						<Li>
							해킹 등에 대비한 기술적 대책
							<br />
							<em>&lt; 디벨로폴리오 &gt;</em>는 해킹이나 컴퓨터 바이러스 등에
							의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고
							주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을
							설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
						</Li>
						<Li>
							개인정보에 대한 접근 제한
							<br />
							개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
							부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
							조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단
							접근을 통제하고 있습니다.
						</Li>
					</Ol>
					<H2>
						제6조(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)
					</H2>
					<Ol>
						<Li>
							디벨로폴리오는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
							이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
						</Li>
						<Li>
							키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
							브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의
							하드디스크에 저장되기도 합니다.
							<br />
							<br />
							가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에
							대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여
							이용자에게 최적화된 정보 제공을 위해 사용됩니다.
							<br />
							<br />
							나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷
							옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수
							있습니다.
							<br />
							<br />
							다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할
							수 있습니다.
						</Li>
					</Ol>
					<H2>제7조 (개인정보 보호책임자)</H2>
					<Ol>
						<Li>
							<Ul>
								<Li>성명 : 조종훈</Li>
								<Li>직책 : 개발자</Li>
								<Li>연락처 : 010-5343-6864, chojonghoon@kakao.com</Li>
							</Ul>
						</Li>
						<Li>
							정보주체께서는 디벨로폴리오 의 서비스(또는 사업)을 이용하시면서
							발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한
							사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.
							디벨로폴리오 는 정보주체의 문의에 대해 지체 없이 답변 및
							처리해드릴 것입니다.
						</Li>
					</Ol>
					<H2>제8조(권익침해 구제방법)</H2>
					<Paragraph>
						정보주체는 개인정보침해로 인한 구제를 받기 위하여
						개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
						분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
						개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
						바랍니다.
					</Paragraph>
					<Ol>
						<Li>
							개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
						</Li>
						<Li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</Li>
						<Li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</Li>
						<Li>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</Li>
					</Ol>
					<Paragraph>
						「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의
						정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대
						하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의
						침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수
						있습니다.
					</Paragraph>
					<Paragraph>
						※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr)
						홈페이지를 참고하시기 바랍니다.
					</Paragraph>
					<H2>제9조(개인정보 처리방침 변경)</H2>
					<Ol>
						<Li>이 개인정보처리방침은 2021년 10월 1부터 적용됩니다.</Li>
						<Li>이 개인정보처리방침은 2021년 10월 1부터 적용됩니다.</Li>
					</Ol>
				</Cell>
			</Grid>
		</>
	)
}

const H1 = styled(HeadingXXLarge, {
	marginTop: '64px',
	fontWeight: 'bold',
})

const H2 = styled(HeadingXLarge, {
	marginTop: '48px',
	fontWeight: 'bold',
})

const Paragraph = styled(ParagraphMedium, {
	marginTop: '24px',
})

const Ol = styled('ol', {
	marginTop: '24px',
	marginLeft: '32px',
})

const Ul = styled('ul', {
	marginTop: '24px',
	marginLeft: '32px',
})

const Li = styled('li', {
	marginBottom: '8px',
})

PrivacyPage.getLayout = (page) => <BasicLayout>{page}</BasicLayout>

export default PrivacyPage
