import { useEffect, useState, forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Container from '@material-ui/core/Container'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

import NumberFormat from 'react-number-format';

import CloseIcon from '@material-ui/icons/Close';

import BudgetParameters from './BudgetParameters'
import BudgetTiles from './BudgetTiles'
import BudgetGraph from './BudgetGraph'
import Portfolio from './Portfolio'

import { views, colorConfig } from '../../utils/budgetService';


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
        '&>*+*': {
            marginLeft: '0.25em',
        }
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
        lineHeight: 2
    }
}))

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

const Dashboard = ({ income, age, open, setopen, currentyear }) => {
    const classes = useStyles()
    const [budget, setbudget] = useState([])
    const [term, setterm] = useState(10)
    const [raisefactor, setraisefactor] = useState(0.1)
    const [inverse, setinverse] = useState(true)
    const [roi, setroi] = useState(0.15);
    const [maturity, setmaturity] = useState(20);
    const [totalInvestment, settotalInvestment] = useState(0);
    const [totalEarnings, settotalEarnings] = useState({ siValue: 0, ciValue: 0 });
    const [viewType, setviewType] = useState(views['tiles']);
    const [profile, setprofile] = useState(0);

    useEffect(() => {
        let newBudget = []
        let newTotalInvestment = 0;

        if (income && age && open) {
            //Initial Year income
            let needs = Math.floor(income * 0.5)
            let wants = Math.floor(income * 0.3)
            let investements = Math.floor(income * 0.2)

            newBudget.push({
                income: income,
                raise: 0,
                needs,
                wants,
                investements,
                year: currentyear
            })
            newTotalInvestment += investements;

            for (let i = 1; i < term; i++) {
                let raise = Math.floor(raisefactor * newBudget[i - 1].income)
                let compoundedIncome = Math.floor(
                    Number(newBudget[i - 1].income) + Number(raise)
                )
                let needs = Math.floor(
                    newBudget[i - 1].needs + Number(raise * (inverse ? 0.2 : 0.5))
                )
                let wants = Math.floor(
                    newBudget[i - 1].wants + Number(raise * 0.3)
                )
                let investements = Math.floor(
                    newBudget[i - 1].investements +
                    Number(raise * (inverse ? 0.5 : 0.2))
                )
                newBudget.push({
                    income: compoundedIncome,
                    raise: raise,
                    needs,
                    wants,
                    investements,
                    year: currentyear + i
                })
                newTotalInvestment += investements;
            }

            let newTotalEarnings = 0;

            let newSiBreakDown = [];
            let newCiBreakDown = [];

            let count = 1;
            newBudget.map(({ investements }, index) => {
                let monthlyInvestment = investements / 12;
                let monthlyIntrest = roi / 12;
                let totalMonths = maturity * 12;
                for (let x = 1; x <= 12; x++) {
                    const y = monthlyInvestment * Math.pow(1 + monthlyIntrest, totalMonths + 1 - count);
                    count++;
                    newTotalEarnings = newTotalEarnings + y;
                }
                newCiBreakDown.push({ year: Number(currentyear) + Number(index), investements, earnings: Math.ceil(newTotalEarnings) })
                if (index > 0) {
                    newCiBreakDown[index].investements += newCiBreakDown[index - 1].investements
                }
            })

            setbudget(newBudget)
            settotalInvestment(newTotalInvestment);
            settotalEarnings({ siValue: 0, ciValue: Math.floor(newTotalEarnings), siBreakDown: newSiBreakDown, ciBreakDown: newCiBreakDown })
        }
    }, [open, age, income, term, inverse, raisefactor, roi, maturity, currentyear])

    useEffect(() => {
        let profile = 2; //Asume high risk
        if (roi <= 0.1) {
            profile = 0;
        } else if (roi > 0.1 && roi <= 0.2) {
            profile = 1;
        }
        setprofile(profile)
    }, [age, roi])

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
                    <Typography variant='h5' display={'inline'}>Warikoo Budget for you </Typography>
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
                        {viewType.value === 'portfolio' && <Portfolio classes={classes} budget={budget} classes={classes} profile={profile} currentyear={currentyear} />}
                    </Container>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dashboard
