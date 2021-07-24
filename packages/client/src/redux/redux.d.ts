import 'react-redux'
import { State } from './slices'

declare module 'react-redux' {
	interface DefaultRootState extends State {}
}
