import { useState, useEffect } from 'react'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import generteThemeObject from './generateThemeObject'

const ThemeApp = ({ component: Component }) => {
    const [theme, settheme] = useState()

    useEffect(() => {
        settheme(generteThemeObject())
    }, [])

    let themeWithResponsiveFontSize = responsiveFontSizes(createMuiTheme(theme))

    return (
        <ThemeProvider theme={themeWithResponsiveFontSize}>
            <Component />
        </ThemeProvider>
    )
}

export default ThemeApp
