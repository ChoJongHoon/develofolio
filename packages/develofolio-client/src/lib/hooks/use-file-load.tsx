import { useState, useCallback } from 'react'

type Options = {
	accept?: string
	limitFileSize?: number
}

export const useFileLoad = (options?: Options) => {
	const [file, setFile] = useState<File | null>(null)

	const onLoad = useCallback(() => {
		const promise = new Promise<File | null>((resolve, reject) => {
			const input = document.createElement('input')

			const timeout = setTimeout(reject, 1000 * 60 * 3)
			input.type = 'file'
			if (options?.accept) {
				input.accept = options.accept
			}
			input.style.display = 'none'
			const onChange = () => {
				clearTimeout(timeout)
				if (!input.files) return reject()
				const file = input.files[0]
				if (
					options?.limitFileSize &&
					file.size > 1024 * 1024 * options.limitFileSize
				) {
					const error = new Error(
						`Can’t upload files over ${options.limitFileSize} MB.`
					)
					error.name = 'FileToBig'
					return reject(error)
				}

				setFile(file)
				resolve(file)
			}
			// Safari에서 DOM에 표시하지 않으면 input 무효
			document.body.appendChild(input)

			input.addEventListener('change', onChange)

			input.click()
			document.body.onfocus = () => {
				document.body.onfocus = null
				document.body.removeChild(input)
			}
		})
		return promise
	}, [options])
	return { onLoad, file, setFile }
}
