import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Loader = ({ customStyle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    return <CircularProgress
        style={customStyle}
        size={isMobile ? "12vw" : "5vw"}
        disableShrink={true}
        thickness={2.0}
    />
}

export default Loader
