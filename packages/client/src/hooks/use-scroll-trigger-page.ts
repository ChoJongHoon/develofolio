import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollTriggerPage = () => {
	useEffect(() => {
		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill())
			ScrollTrigger.clearMatchMedia()
		}
	}, [])
}
