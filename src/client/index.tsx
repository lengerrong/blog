import React from 'react'
import {reactDomRootRender} from '../common/utils'
import BackButton from "../common/components/BackButton"

const initApp = async () => {
    const onClick = () => {
    }
    const html = (<div>
        <BackButton canGoBack={false} onClick={onClick}></BackButton>
        this is client html
    </div>)
    reactDomRootRender(html)
}

initApp()
