import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
// import TextField from '@material-ui/core/TextField'
// import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RiskProfile from './RiskProfile'

import InfoIcon from '@material-ui/icons/Info';

const BudgetParameters = ({
    classes,
    term,
    setterm,
    raisefactor,
    setraisefactor,
    inverse,
    setinverse,
    roi,
    setroi,
    maturity,
    setmaturity,
    viewType,
    setviewType,
    profile,
    setprofile,
    inflation,
    setinflation,
    handleInfo
}) => {
    return (
        <div className={classes.parameterWrapper}>
            <div className='flex flex-center flex-space-between'>
                <div className={classes.strategyWrapper}>
                    <IconButton color="primary" className={classes.infoIcon} onClick={handleInfo}>
                        <InfoIcon fontSize='small' />
                    </IconButton>
                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={inverse}
                                onChange={() => setinverse(!inverse)}
                                name="inverse"
                            />
                        }
                        label="Warikoo's stratergy"
                    />
                </div>
                <RiskProfile size={'medium'} profile={profile} setprofile={setprofile} />
            </div>
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={inflation}
                            onChange={() => setinflation(!inflation)}
                            name="inflation"
                        />
                    }
                    label="Account for inflation"
                />
            </div>
            <div className={classes.buttonsWrapper} >
                <Button size='small' variant={viewType.value === 'tiles' ? 'contained' : "outlined"} color="primary" onClick={() => setviewType('tiles')}>
                    Tiles
                </Button>
                <Button size='small' variant={viewType.value === 'graph' ? 'contained' : "outlined"} color="primary" onClick={() => setviewType('graph')}>
                    Graph
                </Button>
                <Button size='small' variant={viewType.value === 'portfolio' ? 'contained' : "outlined"} color="primary" onClick={() => setviewType('portfolio')}>
                    Portfolio
                </Button>
            </div>
            <div className={classes.sliders}>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        {`Raise: ${raisefactor * 100} %`}
                    </Typography>
                    <Slider
                        value={raisefactor}
                        onChange={(_, newValue) => setraisefactor(newValue)}
                        step={0.05}
                        min={0.1}
                        max={1}
                    />
                </div>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        {`Invest for: ${term} Y`}
                    </Typography>
                    <Slider
                        value={term}
                        onChange={(_, newValue) => setterm(newValue)}
                        step={1}
                        min={1}
                        max={60}
                    />
                </div>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        {`Hold for: ${maturity} Y`}
                    </Typography>
                    <Slider
                        value={maturity}
                        onChange={(_, newValue) => setmaturity(newValue)}
                        step={10}
                        min={10}
                        max={60}
                    />
                </div>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        {`ROI: ${roi * 100}  %`}
                    </Typography>
                    <Slider
                        value={roi}
                        onChange={(_, newValue) => setroi(newValue)}
                        step={0.005}
                        min={0.06}
                        max={1.0}
                    />
                </div>
            </div>
            {/* <TextField
                type="number"
                size="small"
                value={raisefactor * 100}
                label="Raise factor"
                onChange={(e) =>
                    setraisefactor(
                        e.target.value > 0 ? e.target.value / 100 : 0
                    )
                }
                variant="outlined"
                color="primary"
                inputProps={{
                    min: 0,
                    max: 100,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"> %</InputAdornment>
                    ),
                }}
            /> */}
            {/* <TextField
                type="number"
                size="small"
                value={term}
                label="Invest for"
                onChange={(e) =>
                    setterm(e.target.value >= 2 ? e.target.value : 2)
                }
                variant="outlined"
                color="primary"
                inputProps={{
                    min: 2,
                    max: 20,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"> Years</InputAdornment>
                    ),
                }}
            /> */}

            {/* <TextField
                type="number"
                size="small"
                value={maturity}
                label="Hold for"
                onChange={(e) =>
                    setmaturity(e.target.value >= 10 ? e.target.value : 10)
                }
                variant="outlined"
                color="primary"
                inputProps={{
                    min: 10,
                    max: 50,
                    step: 10,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"> Years</InputAdornment>
                    ),
                }}
            /> */}

            {/* <TextField
                type="number"
                size="small"
                value={roi * 100}
                label="ROI per year"
                onChange={(e) =>
                    setroi(e.target.value > 8 ? e.target.value / 100 : 0.08)
                }
                variant="outlined"
                color="primary"
                inputProps={{
                    min: 8,
                    max: 100,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"> %</InputAdornment>
                    ),
                }}
            /> */}
        </div >
    )
}

export default BudgetParameters
