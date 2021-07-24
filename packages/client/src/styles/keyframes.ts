import { keyframes } from '@emotion/react'

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const popIn = keyframes`
  from {
    transform: translateY(16px);
  }
  to {
    transform: translateY(0px);
  }
`
