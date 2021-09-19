import React from 'react'

import Card from './Card'
import Year from './Year'

import { colorConfig } from '../../utils/budgetService';

const PortfolioTiles = ({ classes, currentyear, portfolio, budget }) => {
    let data = [];
    budget.forEach(({ investements }, index) => {
        let x = []
        x.push(<Year key={index} year={currentyear + index} data={investements} />)
        portfolio.forEach(({ name, value }, index1) => {
            x.push(<Card
                key={index + index1 + 1}
                type={2}
                title={name}
                data={Math.floor(investements * (value / 100))}
                color={colorConfig[name]}
            />)

        })
        data.push(<div key={index} className={classes.cardslayout}>{x}</div>)
    })
    return data;
}

export default PortfolioTiles
