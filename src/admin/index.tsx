import React from 'react'
import {reactDomRootRender} from '../common/utils'

const initApp = async () => {
    const html = (<div>
        this is admin html
    </div>)
    reactDomRootRender(html)
}

initApp()
