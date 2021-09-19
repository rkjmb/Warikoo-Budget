import { useState, forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'

import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

import NumberFormat from 'react-number-format';

import CloseIcon from '@material-ui/icons/Close';

import BudgetParameters from './BudgetParameters'
import BudgetTiles from './BudgetTiles'
import BudgetGraph from './BudgetGraph'
import Portfolio from './Portfolio'

import Modal from '../Modal';
import InfoContent from './InfoContent'

import { views, colorConfig } from '../../utils/budgetService';
import useBudget from '../../utils/hooks/useBudget'

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
            display: 'grid',
            gridTemplateColumns: '4fr 8fr'
        },
    },
    cardslayout: {
        padding: '1em',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(125px,1fr))',
        gap: '1em',
        placeItems: 'center'
    },
    appBar: {
        position: 'relative',
        background: 'white',

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(0.5)
    },
    parameterContainer: {
        // position: 'sticky',
        // top: 0,
        background: '#eeeeee',
        paddingBottom: '1em',
        zIndex: 1,
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0 0 1em 1em ',
        },
    },
    parameterWrapper: {
        padding: '1em',
        '&>div+div': {
            marginTop: '1em'
        }
    },
    sliders: {
        display: 'grid',
        gap: '1em',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr 1fr',
        }
    },
    infoContainer: {
        overflow: 'auto',
        maxHeight: '100%'
    },
    pageTitle: {
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 999
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    pieChartWrapper: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    quoteWrapper: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    quote: {
        '&::before': {
            content: 'open-quote',
            fontSize: '1.5em'
        },
        '&::after': {
            content: 'close-quote',
            fontSize: '1.5em'
        }
    },
    statement: {
        lineHeight: 2,
        [theme.breakpoints.down('xs')]: {
            lineHeight: 2.25,
        }
    },
    accordianDetails: {
        display: 'block'
    },
    strategyWrapper: {
        display: 'inline-flex'
    },
    infoIcon: {
        paddingLeft: 0,
    }
}))

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

const Dashboard = ({ income, age, open, setopen, currentyear }) => {
    const classes = useStyles()

    const { budget, params } = useBudget({ income, age, shouldCompute: open, currentyear })

    const {
        term, setterm,
        raisefactor, setraisefactor,
        inverse, setinverse,
        inflation, setinflation,
        roi, setroi,
        maturity, setmaturity,
        totalInvestment,
        totalEarnings,
        profile
    } = params;

    const [viewType, setviewType] = useState(views['tiles']);
    const [info, setinfo] = useState(false)

    const handleClose = () => {
        if (setopen) {
            setopen(false)
        }
    }

    const handleSetprofile = (profile) => {
        setroi(profile.roi)
    }

    const handleViewType = (viewType) => {
        setviewType(views[viewType])
    }

    const handleInfo = () => {
        setinfo(!info)
    }

    return (
        <div>
            <Dialog
                fullScreen
                onClose={handleClose}
                open={open}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    {handleClose ? (
                        <IconButton color="primary" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>

                    ) : null}
                    {'Warikoo Budget for you'}
                    {/* <Typography variant='h6' display={'inline'}>{`(${age} years)`}</Typography> */}
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Container className={classes.parameterContainer}>
                        <BudgetParameters
                            classes={classes}
                            term={term}
                            setterm={setterm}
                            raisefactor={raisefactor}
                            setraisefactor={setraisefactor}
                            inverse={inverse}
                            setinverse={setinverse}
                            roi={roi}
                            setroi={setroi}
                            maturity={maturity}
                            setmaturity={setmaturity}
                            viewType={viewType}
                            setviewType={handleViewType}
                            profile={profile}
                            setprofile={handleSetprofile}
                            inflation={inflation}
                            setinflation={setinflation}
                            handleInfo={handleInfo}
                        />
                        <div className={classes.statement}>
                            <Typography display='inline' gutterBottom>{`Your total investment of `}</Typography>
                            <Chip
                                color="primary"
                                style={{ background: colorConfig.investements }}
                                label={<NumberFormat value={totalInvestment} thousandsGroupStyle='lakh'
                                    displayType='text'
                                    thousandSeparator
                                    isNumericString
                                    prefix="₹" />
                                }
                            />
                            <Typography display='inline' gutterBottom>{` from ${currentyear} to ${Number(currentyear) + Number(term - 1)
                                } will return `} </Typography>
                            <Chip
                                color="primary"
                                style={{ background: colorConfig.earnings }}
                                label={<NumberFormat value={totalEarnings.ciValue} thousandsGroupStyle='lakh'
                                    displayType='text'
                                    thousandSeparator
                                    isNumericString
                                    prefix="₹" />
                                }
                            />
                            <Typography display='inline' gutterBottom>{` in ${Number(currentyear) + Number(maturity - 1)}`}</Typography>
                        </div>
                    </Container>
                    <Container className={classes.infoContainer}>
                        <Typography className={classes.pageTitle} variant='h6' gutterBottom>{viewType.pageTitle}</Typography>
                        {viewType.value === 'graph' && <BudgetGraph classes={classes} budget={budget} currentyear={currentyear} totalEarnings={totalEarnings} maturity={maturity} />}
                        {viewType.value === 'tiles' && <BudgetTiles classes={classes} budget={budget} currentyear={currentyear} />}
                        {viewType.value === 'portfolio' && <Portfolio classes={classes} budget={budget} profile={profile} currentyear={currentyear} />}
                    </Container>
                </DialogContent>
            </Dialog>
            {info && <Modal
                onClose={handleInfo}
                open={info}
                title={`Warikoo's Strategy`}
                content={<InfoContent />}
            />}
        </div>
    )
}

export default Dashboard
