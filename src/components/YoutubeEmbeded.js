import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    responsiveContainer: {
        overflow: 'hidden',
        paddingBottom: '56.25%',
        position: 'relative',
        height: 0
    },
    iframe: {
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        position: 'absolute'
    }
}))

const YoutubeEmbed = ({ embedId }) => {
    const classes = useStyles();
    return <div className={classes.responsiveContainer} >
        <iframe
            className={classes.iframe}
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Warikoo's Strategy"
        />
    </div >
};

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;