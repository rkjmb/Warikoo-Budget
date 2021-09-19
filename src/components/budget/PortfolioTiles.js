import React from 'react'

import Card from './Card'
import Year from './Year'

import { colorConfig } from '../../utils/budgetService';

const PortfolioTiles = ({ classes, currentyear, portfolio, budget }) => {
    let data = [];
    budget.map(({ income, raise, investements }, index) => {
        let x = []
        x.push(<Year year={currentyear + index} data={investements} />)
        portfolio.map(({ name, value }) => {
            x.push(<Card
                type={2}
                title={name}
                data={Math.floor(investements * (value / 100))}
                color={colorConfig[name]}
            />)

        })
        data.push(<div className={classes.cardslayout}>{x}</div>)
    })
    return data;
}

export default PortfolioTiles
