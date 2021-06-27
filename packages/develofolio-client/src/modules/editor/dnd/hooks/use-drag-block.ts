import { useDrag } from 'react-dnd'

export const useDragBlock = (id?: string) => {
	return useDrag(
		() => ({
			type: 'block',
			item() {
				document.body.classList.add('dragging')
				return { id }
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: () => {
				document.body.classList.remove('dragging')
			},
		}),
		[]
	)
}
