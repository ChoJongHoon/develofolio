import { Descendant, Text } from 'slate'
import {
	HeadingLarge,
	HeadingMedium,
	HeadingSmall,
	HeadingXSmall,
	HeadingXXLarge,
	LabelLarge,
	LabelMedium,
	LabelSmall,
	ParagraphMedium,
	ParagraphSmall,
} from 'baseui/typography'
import { CustomElement } from './custom-types'
import { useStyletron } from 'styletron-react'
import OpenColor from 'open-color'
import { borderRadius, padding } from 'polished'
import { Cell, Grid } from 'baseui/layout-grid'
import { Icon, IconType } from '~/components/icon'
import { LINKS as BANNER_LINKS } from './banner/banner'
import { mediaQuery } from '~/styles/responsive'
import { AspectRatioBox, AspectRatioBoxBody } from 'baseui/aspect-ratio-box'
import Image from 'next/image'
import { generateFileUrl } from '~/utils/generate-file-url'
import { LINKS as PROJECT_LINKS } from './project-list/project-list-item'
import React from 'react'

const generateKey = (type: CustomElement['type'], index: number) =>
	`${type}-${index}`

interface SerializeProps {
	value: Descendant[]
}

export const Serialize = ({ value }: SerializeProps) => {
	const [css] = useStyletron()

	return (
		<>
			{value.map((element, index, array) => {
				if (Text.isText(element)) {
					let children: React.ReactNode = element.text
					if (element.bold) children = <strong>{children}</strong>
					if (element.italic) children = <em>{children}</em>
					if (element.code) children = <code>{children}</code>
					if (element.link) {
						children = (
							<a
								href={element.link}
								target="_blank"
								rel="noreferrer"
								className={css({
									cursor: 'pointer',
									color: OpenColor.gray[7],
								})}
							>
								{children}
							</a>
						)
					}
					if (element.color)
						children = (
							<span
								className={css({
									color: OpenColor[element.color][6],
								})}
							>
								{children}
							</span>
						)
					if (element.highlight) {
						children = (
							<span
								className={css({
									backgroundColor: OpenColor[element.highlight][6],
								})}
							>
								{children}
							</span>
						)
					}
					return children
				}
				const children = element.children ? (
					<Serialize value={element.children} />
				) : (
					[]
				)
				switch (element.type) {
					case 'paragraph':
						return (
							<Grid
								key={generateKey(element.type, index)}
								overrides={{
									Grid: {
										style: {
											marginTop: '4px',
											marginBottom: '4px',
										},
									},
								}}
							>
								<Cell span={[4, 8, 12]}>
									<ParagraphMedium>{children}</ParagraphMedium>
								</Cell>
							</Grid>
						)
					case 'heading':
						return (
							<Grid
								key={generateKey(element.type, index)}
								overrides={{
									Grid: {
										style: {
											marginTop:
												element.level === 1
													? '60px'
													: element.level === 2
													? '32px'
													: '20px',
											marginBottom:
												element.level === 1
													? '24px'
													: element.level === 2
													? '16px'
													: '8px',
										},
									},
								}}
							>
								<Cell span={[4, 8, 12]}>
									{element.level === 1 ? (
										<HeadingLarge
											overrides={{
												Block: {
													style: {
														fontWeight: 'bold',
														['::before']: {
															content: '""',
															userSelect: 'none',
															display: 'inline-block',
															width: '4px',
															height: '45px',
															backgroundColor: OpenColor.teal[6],
															marginRight: '16px',
															verticalAlign: 'bottom',
														},
													},
												},
											}}
										>
											{children}
										</HeadingLarge>
									) : element.level === 2 ? (
										<HeadingMedium
											overrides={{
												Block: {
													style: {
														fontWeight: 'bold',
													},
												},
											}}
										>
											{children}
										</HeadingMedium>
									) : (
										<HeadingSmall
											overrides={{
												Block: {
													style: {
														fontWeight: 'bold',
													},
												},
											}}
										>
											{children}
										</HeadingSmall>
									)}
								</Cell>
							</Grid>
						)
					case 'bulleted-list':
						return (
							<Grid key={generateKey(element.type, index)}>
								<Cell span={[4, 8, 12]}>
									<ul
										className={css({
											listStyle: 'none',
										})}
									>
										{children}
									</ul>
								</Cell>
							</Grid>
						)
					case 'list-item':
						return (
							<li
								key={generateKey(element.type, index)}
								className={css({
									display: 'flex',
									alignItems: 'flex-start',
									paddingLeft: '2px',
									fontSize: '16px',
									lineHeight: 1.5,
								})}
							>
								<div
									className={css({
										flexGrow: 0,
										flexShrink: 0,
										flexBasis: 'auto',
										marginRight: '2px',
										width: '24px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '24px',
										lineHeight: 1,
										marginBottom: '0.1em',
									})}
									contentEditable={false}
								>
									•
								</div>
								<span
									className={css({
										flexGrow: 1,
										flexShrink: 1,
										flexBasis: '0px',
									})}
								>
									{children}
								</span>
							</li>
						)
					case 'logo':
						return (
							<span
								key={generateKey(element.type, index)}
								className={css({
									display: 'inline-flex',
								})}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`/logos/${element.file}`}
									className={css({
										height: '1em',
										display: 'block',
									})}
									alt={element.name}
								/>
								{children}
							</span>
						)
					case 'blockquote':
						return (
							<Grid key={generateKey(element.type, index)}>
								<Cell span={[4, 8, 12]}>
									<blockquote
										className={css({
											borderLeftStyle: 'solid',
											borderLeftWidth: '3px',
											borderLeftColor: OpenColor.gray[7],
											paddingLeft: '14px',
											paddingTop: '2px',
											paddingBottom: '2px',
											position: 'relative',
										})}
									>
										{children}
									</blockquote>
								</Cell>
							</Grid>
						)
					case 'banner':
						return (
							<div
								key={generateKey(element.type, index)}
								className={css({
									backgroundColor: OpenColor.gray[1],
									paddingTop: '48px',
									paddingBottom: '48px',
								})}
							>
								<Grid>
									<Cell
										span={[4, 4, 5]}
										skip={[0, 0, 1]}
										overrides={{
											Cell: {
												style: {
													marginBottom: '48px',
													[mediaQuery('SMALL')]: {
														marginBottom: '48px',
													},
													[mediaQuery('MEDIUM')]: {
														marginBottom: '0px',
													},
												},
											},
										}}
									>
										<div
											className={css({
												display: 'flex',
												flexDirection: 'column',
												height: '100%',
											})}
										>
											<div
												className={css({
													flexGrow: 1,
												})}
											>
												{children}
											</div>
											<ul
												className={css({
													listStyle: 'none',
													display: 'flex',
												})}
											>
												{Object.keys(element.links)
													.filter(
														(key) =>
															element.links[key as keyof typeof element.links]
													)
													.map((key) => (
														<li
															key={key}
															className={css({
																border: 'none',
																[':not(:last-child)']: {
																	marginRight: '8px',
																},
															})}
														>
															<a
																href={
																	element.links[
																		key as keyof typeof element.links
																	] as string
																}
																target="_blank"
																rel="noreferrer"
																className={css({
																	display: 'flex',
																})}
															>
																<Icon
																	type={
																		BANNER_LINKS.find(
																			(LINK) => LINK.name === key
																		)?.icon as IconType
																	}
																	size={24}
																/>
															</a>
														</li>
													))}
											</ul>
										</div>
									</Cell>
									{element.profile && (
										<Cell span={[4, 4, 5]}>
											<AspectRatioBox aspectRatio={4 / 3}>
												<AspectRatioBoxBody>
													<Image
														src={generateFileUrl(element.profile, {
															width: 400,
															height: 300,
														})}
														layout="fill"
														alt="Profile"
														objectFit="cover"
													/>
												</AspectRatioBoxBody>
											</AspectRatioBox>
										</Cell>
									)}
								</Grid>
							</div>
						)
					case 'banner-name':
						return (
							<HeadingXXLarge
								key={generateKey(element.type, index)}
								overrides={{
									Block: {
										style: {
											fontWeight: 'bold',
											position: 'relative',
										},
									},
								}}
								color={OpenColor.gray[8]}
							>
								{children}
							</HeadingXXLarge>
						)
					case 'banner-tagline':
						return (
							<HeadingSmall
								key={generateKey(element.type, index)}
								overrides={{
									Block: {
										style: {
											position: 'relative',
										},
									},
								}}
								color={OpenColor.gray[6]}
							>
								{children}
							</HeadingSmall>
						)
					case 'banner-bio':
						return (
							<ParagraphMedium
								key={generateKey(element.type, index)}
								overrides={{
									Block: {
										style: {
											marginTop: '16px',
											marginBottom: '16px',
											position: 'relative',
											whiteSpace: 'break-spaces',
										},
									},
								}}
								color={OpenColor.gray[7]}
							>
								{children}
							</ParagraphMedium>
						)
					case 'skill-list':
						return (
							<Grid
								key={generateKey(element.type, index)}
								overrides={{
									Grid: {
										style: {
											rowGap: '32px',
											marginTop: '16px',
											marginBottom: '16px',
										},
									},
								}}
							>
								{children}
							</Grid>
						)
					case 'skill-list-item':
						return (
							<Cell key={generateKey(element.type, index)} span={[2, 2, 3]}>
								{children}
							</Cell>
						)
					case 'skill-list-item-logos':
						return (
							<ul
								key={generateKey(element.type, index)}
								className={css({
									listStyle: 'none',
									display: 'flex',
									marginBottom: '8px',
								})}
							>
								{element.logos.map((logo) => (
									<li
										key={logo.id}
										className={css({
											[':not(:last-child)']: {
												marginRight: '8px',
											},
										})}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={`/logos/${logo.file}`}
											className={css({
												height: '24px',
												display: 'block',
											})}
											alt={logo.name}
										/>
									</li>
								))}
							</ul>
						)
					case 'skill-list-item-name':
						return (
							<LabelMedium
								key={generateKey(element.type, index)}
								overrides={{
									Block: {
										style: {
											fontWeight: 'bold',
											marginBottom: '4px',
										},
									},
								}}
							>
								{children}
							</LabelMedium>
						)
					case 'skill-list-item-description':
						return (
							<ParagraphSmall
								key={generateKey(element.type, index)}
								$style={{
									whiteSpace: 'break-spaces',
								}}
							>
								{children}
							</ParagraphSmall>
						)
					case 'project-list':
						return (
							<Grid
								key={generateKey(element.type, index)}
								overrides={{
									Grid: {
										style: {
											rowGap: '32px',
											marginTop: '16px',
											marginBottom: '16px',
										},
									},
								}}
							>
								{children}
							</Grid>
						)
					case 'project-list-item':
						return (
							<Cell key={generateKey(element.type, index)} span={[4, 4, 3]}>
								<div
									className={css({
										display: 'flex',
										flexDirection: 'column',
										backgroundColor: OpenColor.gray[0],
										...borderRadius('top', '8px'),
										...borderRadius('bottom', '8px'),
									})}
								>
									{element.thumbnail && (
										<AspectRatioBox aspectRatio={16 / 9}>
											<AspectRatioBoxBody>
												<Image
													src={generateFileUrl(element.thumbnail)}
													layout="fill"
													objectFit="cover"
													alt="Project Image"
													className={css({
														...borderRadius('top', '8px'),
													})}
												/>
											</AspectRatioBoxBody>
										</AspectRatioBox>
									)}
									<div
										className={css({
											...padding('16px'),
										})}
									>
										<Serialize value={[element.children[0]]} />
										{element.logos.length > 0 && (
											<ul
												className={css({
													listStyle: 'none',
													display: 'flex',
													marginBottom: '8px',
													flexWrap: 'wrap',
												})}
											>
												{element.logos.map((logo) => (
													<li
														key={logo.id}
														className={css({
															[':not(:last-child)']: {
																marginRight: '8px',
															},
														})}
													>
														{/* eslint-disable-next-line @next/next/no-img-element */}
														<img
															src={`/logos/${logo.file}`}
															className={css({
																height: '16px',
																display: 'block',
															})}
															alt={logo.name}
														/>
													</li>
												))}
											</ul>
										)}
										<Serialize value={[element.children[1]]} />
										<ul
											className={css({
												display: 'flex',
												justifyContent: 'flex-end',
												marginTop: '8px',
												listStyle: 'none',
											})}
										>
											{Object.keys(element.links)
												.filter(
													(key) =>
														element.links[key as keyof typeof element.links]
												)
												.map((key) => (
													<li
														key={key}
														className={css({
															border: 'none',
															[':not(:last-child)']: {
																marginRight: '8px',
															},
														})}
													>
														<a
															href={
																element.links[
																	key as keyof typeof element.links
																] as string
															}
															rel="noreferrer"
															target="_blank"
															className={css({
																display: 'flex',
																backgroundColor: 'transparent',
																...padding('0px'),
															})}
														>
															<Icon
																type={
																	PROJECT_LINKS.find(
																		(LINK) => LINK.name === key
																	)?.icon as IconType
																}
																size={20}
																color={OpenColor.teal[6]}
															/>
														</a>
													</li>
												))}
										</ul>
									</div>
								</div>
							</Cell>
						)
					case 'project-list-item-name':
						return (
							<HeadingSmall
								key={generateKey(element.type, index)}
								overrides={{
									Block: {
										style: {
											fontWeight: 'bold',
											marginBottom: '8px',
										},
									},
								}}
								color={OpenColor.gray[9]}
							>
								{children}
							</HeadingSmall>
						)
					case 'project-list-item-description':
						return (
							<ParagraphSmall
								key={generateKey(element.type, index)}
								color={OpenColor.gray[7]}
								$style={{
									whiteSpace: 'break-spaces',
								}}
							>
								{children}
							</ParagraphSmall>
						)
					case 'school-list':
						return (
							<Grid
								key={generateKey(element.type, index)}
								overrides={{
									Grid: {
										style: {
											marginTop: '16px',
											marginBottom: '16px',
										},
									},
								}}
							>
								{children}
							</Grid>
						)
					case 'school-list-item':
						return (
							<Cell key={generateKey(element.type, index)} span={[4, 8, 12]}>
								<div
									className={css({
										display: 'flex',
										alignItems: 'center',
										borderBottomStyle: 'solid',
										borderBottomWidth: '1px',
										borderBottomColor: OpenColor.gray[3],
										position: 'relative',
										...padding('8px', '0px'),
									})}
								>
									{element.logo && (
										<div
											contentEditable={false}
											className={css({
												display: 'flex',
												marginRight: '16px',
												...padding('0px', '8px'),
											})}
										>
											<Image
												src={generateFileUrl(element.logo, 72)}
												width={72}
												height={72}
												alt="Logo"
											/>
										</div>
									)}
									<div
										className={css({
											flexGrow: 1,
											flexShrink: 1,
											flexBasis: 0,
										})}
									>
										{children}
									</div>
								</div>
							</Cell>
						)
					case 'school-list-item-name':
						return (
							<HeadingXSmall
								key={generateKey(element.type, index)}
								color={OpenColor.gray[8]}
								className={css({
									fontWeight: 'bold',
									position: 'relative',
								})}
							>
								{children}
							</HeadingXSmall>
						)
					case 'school-list-item-major':
						return (
							<LabelLarge
								key={generateKey(element.type, index)}
								color={OpenColor.gray[6]}
								className={css({
									position: 'relative',
								})}
							>
								{children}
							</LabelLarge>
						)
					case 'school-list-item-period':
						return (
							<LabelSmall
								key={generateKey(element.type, index)}
								color={OpenColor.gray[6]}
								className={css({
									position: 'relative',
								})}
							>
								{children}
							</LabelSmall>
						)
					case 'career-list':
						return (
							<Grid
								key={generateKey(element.type, index)}
								overrides={{
									Grid: {
										style: {
											marginTop: '16px',
											marginBottom: '16px',
										},
									},
								}}
							>
								{children}
							</Grid>
						)
					case 'career-list-item':
						return (
							<Cell key={generateKey(element.type, index)} span={[4, 8, 12]}>
								<div
									className={css({
										display: 'flex',
										alignItems: 'flex-start',
										borderBottomStyle: 'solid',
										borderBottomWidth: '1px',
										borderBottomColor: OpenColor.gray[3],
										position: 'relative',
										...padding('8px', '0px'),
									})}
								>
									{element.logo && (
										<div
											contentEditable={false}
											className={css({
												display: 'flex',
												marginRight: '16px',
												...padding('0px', '8px'),
											})}
										>
											<Image
												src={generateFileUrl(element.logo, 72)}
												width={72}
												height={72}
												alt="Logo"
											/>
										</div>
									)}
									<div
										className={css({
											flexGrow: 1,
											flexShrink: 1,
											flexBasis: 0,
										})}
									>
										{children}
									</div>
								</div>
							</Cell>
						)
					case 'career-list-item-name':
						return (
							<HeadingXSmall
								key={generateKey(element.type, index)}
								color={OpenColor.gray[8]}
								className={css({
									fontWeight: 'bold',
									position: 'relative',
								})}
							>
								{children}
							</HeadingXSmall>
						)
					case 'career-list-item-position':
						return (
							<LabelLarge
								key={generateKey(element.type, index)}
								color={OpenColor.gray[6]}
								className={css({
									position: 'relative',
								})}
							>
								{children}
							</LabelLarge>
						)
					case 'career-list-item-period':
						return (
							<LabelSmall
								key={generateKey(element.type, index)}
								color={OpenColor.gray[6]}
								className={css({
									position: 'relative',
								})}
							>
								{children}
							</LabelSmall>
						)
					case 'career-list-item-description':
						return (
							<ParagraphMedium
								key={generateKey(element.type, index)}
								color={OpenColor.gray[7]}
								className={css({
									whiteSpace: 'break-spaces',
									position: 'relative',
									paddingTop: '16px',
									paddingBottom: '16px',
								})}
							>
								{children}
							</ParagraphMedium>
						)
				}
			})}
		</>
	)
}
