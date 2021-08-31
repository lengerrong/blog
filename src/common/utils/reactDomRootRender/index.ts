import * as ReactDOM from 'react-dom'
import {isSSREnabled} from '../isSSREnabled'

export const reactDomRootRender = (html: JSX.Element) => {
    const root = document.getElementById('root')
    if (isSSREnabled()) {
        return ReactDOM.hydrate(html, root)
    } else {
        return ReactDOM.render(html, root)
    }
}
