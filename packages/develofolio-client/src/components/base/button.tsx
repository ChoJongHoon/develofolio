import React, { FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { css } from '@emotion/react'
import OpenColor from 'open-color'

// ====================================
// 모든 버튼에 공용으로 들어갈 style 관련 props
// ====================================
export type ButtonSize = 'xs' | 's' | 'm' | 'l' // default 'm'
export type ButtonColor = keyof OpenColor // default 'blue'
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' // default 'primary'

export type ButtonStyleProps = {
	variant: ButtonVariant
	size: ButtonSize
	color: ButtonColor
	disabled: boolean
}

export type ButtonCommonProps = {
	prefix?: React.ReactNode
	suffix?: React.ReactNode
}

// ====================================
// 버튼 타입에 따라 다른 동작 관련 props
// ====================================
export type ButtonButtonProps = {
	type: 'button'
	buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>
}
export type ButtonLinkProps = {
	type: 'link'
	linkProps: Omit<LinkProps, 'passHref' | 'children'>
}

// ====================================
// 위 항목들을 결합한 통합 props
// ====================================
export type ButtonProps = Partial<ButtonStyleProps> &
	ButtonCommonProps &
	(ButtonButtonProps | ButtonLinkProps)

export const Button: FC<ButtonProps> = ({
	variant = 'primary',
	color = 'blue',
	size = 'm',
	disabled = false,
	...props
}) => {
	const styleProps = { variant, size, color, disabled }

	return props.type === 'button' ? (
		<ButtonButton style={styleProps} {...props} />
	) : (
		<ButtonLink style={styleProps} {...props} />
	)
}

/**
 * 주로 onClick을 받아서 사용하는 버튼
 * button 태그로 랜더링된다.
 */
const ButtonButton: FC<
	{ style: ButtonStyleProps } & ButtonCommonProps & ButtonButtonProps
> = ({ children, buttonProps, style, prefix, suffix }) => {
	return (
		<button {...buttonProps} css={styles(style)}>
			{prefix && <span css={iconStyles('start')}>{prefix}</span>}
			{typeof children === 'string' ? <span>{children}</span> : children}
			{suffix && <span css={iconStyles('end')}>{suffix}</span>}
		</button>
	)
}

/**
 * href를 받아 next/link를 이용하여 페이지 이동하는 버튼
 * a 태그로 랜더링된다.
 */
const ButtonLink: FC<
	{ style: ButtonStyleProps } & ButtonCommonProps & ButtonLinkProps
> = ({ children, linkProps, style, prefix, suffix }) => {
	return (
		<Link href={linkProps.href} passHref>
			<a css={styles(style)}>
				{prefix && <span css={iconStyles('start')}>{prefix}</span>}
				{typeof children === 'string' ? <span>{children}</span> : children}
				{suffix && <span css={iconStyles('end')}>{suffix}</span>}
			</a>
		</Link>
	)
}

const styles = ({ color, disabled, size, variant }: ButtonStyleProps) => css`
	/* normarlize */
	appearance: none;
	border: none;
	text-decoration: none;
	background: none;
	color: inherit;

	/* default styles */
	cursor: ${disabled ? 'not-allowed' : 'pointer'};
	font-weight: 700;
	border-radius: 24px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	box-sizing: border-box;
	transition: background-color 0.2s, color 0.2s;
	width: max-content;

	/* variant, disabled */
	${variant === 'primary'
		? primaryStyles(color, disabled)
		: variant === 'secondary'
		? secondaryStyles(color, disabled)
		: variant === 'outline'
		? outlineStyles(color, disabled)
		: ghostStyles(color, disabled)}

	/* size */
  ${size === 'l'
		? largeStyles
		: size === 'm'
		? mediumStyles
		: size === 's'
		? smallStyles
		: xsmallStyles}
`

// ==============================================================
//                        variant style
// ==============================================================
const primaryStyles = (color: ButtonColor, disabled: boolean) =>
	disabled
		? css`
				/* disabled */
				background-color: ${OpenColor.gray[5]};
				color: white;
		  `
		: css`
				background-color: ${OpenColor[color][7]};
				&:hover {
					background-color: ${OpenColor[color][5]};
				}
				color: white;
		  `
const secondaryStyles = (color: ButtonColor, disabled: boolean) =>
	disabled
		? css`
				/* disabled */
				background-color: ${OpenColor.gray[0]};
				color: ${OpenColor.gray[4]};
		  `
		: css`
				background-color: ${OpenColor[color][0]};
				color: ${OpenColor[color][7]};
				&:hover {
					color: ${OpenColor[color][5]};
				}
		  `
const outlineStyles = (color: ButtonColor, disabled: boolean) =>
	disabled
		? css`
				/* disabled */
				background-color: white;
				color: ${OpenColor.gray[3]};
				border: 1.5px solid ${OpenColor.gray[3]};
		  `
		: css`
				background-color: white;
				border-style: solid;
				border-width: 1.5px;
				border-color: ${OpenColor[color][7]};
				color: ${OpenColor[color][7]};
				&:hover {
					border-color: ${OpenColor[color][5]};
					color: ${OpenColor[color][5]};
				}
		  `
const ghostStyles = (color: ButtonColor, disabled: boolean) =>
	disabled
		? css`
				/* disabled */
				background-color: white;
				color: ${OpenColor.gray[5]};
		  `
		: css`
				background-color: transparent;
				color: ${OpenColor[color][7]};
				&:hover {
					background-color: ${OpenColor.gray[0]};
					color: ${OpenColor[color][6]};
				}
		  `

// ==============================================================
//                          size style
// ==============================================================
const largeStyles = css`
	padding: 12px 24px;
	--label-icon-gap: 8px;
	--icon-size: 12px;
`
const mediumStyles = css`
	padding: 8px 16px;
	--label-icon-gap: 8px;
	--icon-size: 12px;
`
const smallStyles = css`
	padding: 3px 12px;
	--label-icon-gap: 8px;
	--icon-size: 12px;
`
const xsmallStyles = css`
	padding: 2px 8px;
	--label-icon-gap: 4px;
	--icon-size: 10px;
`

/**
 * prefix, suffix 스타일
 */
const iconStyles = (position: 'start' | 'end') => css`
	margin-right: ${position === 'start' && 'var(--label-icon-gap)'};
	margin-left: ${position === 'end' && 'var(--label-icon-gap)'};
	svg {
		width: var(--icon-size);
		height: var(--icon-size);
	}
`
