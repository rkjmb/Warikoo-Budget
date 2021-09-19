import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

import { portfolio, colorConfig } from '../../utils/budgetService';
import PortfolioTiles from './PortfolioTiles';

import Typography from '@material-ui/core/Typography';

const Portfolio = ({ classes, profile, budget, currentyear }) => {

    const renderLabel = function (entry) {
        return `${entry.value}%`;
    }

    return (
        <div>
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
