import 'react-redux'
import { State } from './slices'

declare module 'react-redux' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultRootState extends State {}
}
