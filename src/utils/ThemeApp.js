import { useState, useEffect } from 'react'
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import generteThemeObject from './generateThemeObject'

const ThemeApp = ({ component: Component }) => {
    const [theme, settheme] = useState()

    useEffect(() => {
        settheme(generteThemeObject())
    }, [])

    let themeWithResponsiveFontSize = responsiveFontSizes(createTheme(theme))

    return (
        <ThemeProvider theme={themeWithResponsiveFontSize}>
            <Component />
        </ThemeProvider>
    )
}

export default ThemeApp
