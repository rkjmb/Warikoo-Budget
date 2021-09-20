import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NumberFormat from 'react-number-format';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

import Dashboard from '../../components/budget/Dashboard';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from 'moment';

import budgetImage from '../../assets/budget/budget.svg'

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
// import YouTubeIcon from '@material-ui/icons/YouTube';

import { linkedInLink, instaLink } from '../../config/config'
import { redirectToLink } from '../../utils/commonService'

const MIN_AGE = 18;
const MAX_AGE = 90;

const useStyles = makeStyles((theme) => ({
    budget: {
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '12fr',
            gridTemplateRows: '6fr 6fr'
        }
    },
    cover: {
        display: 'grid',
        placeItems: 'center',
    },
    landingImage: {
        backgroundSize: 'cover',
        maxWidth: '60%',
        marginTop: '1em'
    },
    form: {
        display: 'flex',
        gap: '1em',
        padding: '1em',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonWrapper: {
        textAlign: 'center'
    },
    footerIcons: {

    }
}))

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandsGroupStyle='lakh'
            thousandSeparator
            isNumericString
            prefix="₹"
        // format="# ## ###"
        // mask="_"
        />
    );
}

const Budget = () => {
    const classes = useStyles();
    const [income, setincome] = useState(384000);
    const [dashboard, setdashboard] = useState(false);
    const [currentyear, setcurrentyear] = useState(new Date().getFullYear());
    const [selectedDate, handleDateChange] = useState(moment().subtract(currentyear - 1997, 'years'));
    const [dateError, setdateError] = useState(false)

    const handleSubmit = () => {
        if (income && !dateError && selectedDate) {
            setdashboard(true)
        }
    }

    const handleRedirect = (link) => {
        redirectToLink(link, true)
    }

    return (
        <div className={classes.budget}>
            <div className={classes.cover}>
                <Typography variant={'h3'} color={'primary'}>Warikoo Budget</Typography>
                <Typography variant={'caption'} gutterBottom>Investing made simple</Typography>
                <img className={classes.landingImage} src={budgetImage} alt={'Landing'} />
            </div>
            <div className={classes.form}>
                <TextField
                    size='small'
                    value={income}
                    label='Enter your income (Annual)'
                    onChange={(e) => setincome(e.target.value)}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    color="secondary"
                />
                {false && <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        size='small'
                        views={["year"]}
                        label="Year of birth"
                        minDate={new Date(`${currentyear - MAX_AGE}-03-01`)}
                        maxDate={new Date(`${currentyear - MIN_AGE}-06-01`)}
                        value={selectedDate}
                        onChange={handleDateChange}
                        onError={setdateError}
                        inputVariant='outlined'
                        autoOk
                        invalidDateMessage='Invalid Year of birth'
                        minDateMessage={`Year of birth cannot be before ${currentyear - MAX_AGE}`}
                        maxDateMessage={`Year of birth cannot be after ${currentyear - MIN_AGE}`}
                    />
                </MuiPickersUtilsProvider>}
                <div className={classes.buttonWrapper}>
                    <IconButton color="primary" onClick={handleSubmit}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
            </div>
            <Dashboard income={income} age={currentyear - moment(selectedDate).year()} currentyear={currentyear} open={dashboard} setopen={setdashboard} setcurrentyear={setcurrentyear} />
            <footer>
                <div className='flex flex-center'>
                    <Typography variant={'subtitle2'} gutterBottom>Developed by Rajkumar</Typography>
                </div>
                <div className='flex flex-center'>
                    <IconButton color="primary" className={classes.socialicons} onClick={() => handleRedirect(linkedInLink)}>
                        <LinkedInIcon style={{ color: '#0077b5' }} fontSize='large' />
                    </IconButton>
                    <IconButton color="primary" className={classes.socialicons} onClick={() => handleRedirect(instaLink)}>
                        <InstagramIcon style={{ color: '#000000' }} fontSize='large' />
                    </IconButton>
                </div>
            </footer>
        </div>
    )
}

export default Budget
