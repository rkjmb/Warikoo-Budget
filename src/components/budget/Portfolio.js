import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

import { portfolio, colorConfig } from '../../utils/budgetService';
import PortfolioTiles from './PortfolioTiles';

import Typography from '@material-ui/core/Typography';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import RiskProfile from './RiskProfile'

const Portfolio = ({ classes, profile, setprofile, budget, currentyear }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const renderLabel = function (entry) {
        return `${entry.value}%`;
    }

    return (
        <div>
            {isMobile && <>
                <Typography display='inline' variant={'subtitle2'} color={'primary'} gutterBottom>Risk : </Typography>
                <RiskProfile size={'small'} profile={profile} setprofile={setprofile} />
            </>}
            <div className={classes.pieChartWrapper}>
                <PieChart width={350} height={350}>
                    <Pie data={portfolio[profile]} dataKey="value" cx="50%" cy="50%" label={renderLabel}>
                        {portfolio[profile].map(({ name }, index) => (
                            <Cell key={`cell-${index}`} fill={colorConfig[name]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
                <div className={classes.quoteWrapper}>
                    <Typography display='inline' className={classes.quote} variant={'h5'} color={'primary'} gutterBottom>FD mein invest mat karo !!!</Typography>
                </div>
            </div>
            <PortfolioTiles classes={classes} currentyear={currentyear} portfolio={portfolio[profile]} budget={budget} />

        </div >
    )
}

export default Portfolio
