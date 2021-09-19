import React from 'react';

import Card from './Card'
import Income from './Income'
import Year from './Year'
import PieChart from './PieChart'

const BudgetTiles = ({ classes, budget, currentyear }) => {
    return (
        budget.map(
            (
                { income, raise, needs, wants, investements },
                index
            ) => (
                <div key={index} className={classes.cardslayout}>
                    <Year year={currentyear + index} raise={raise} />
                    <Income income={income} />
                    <Card
                        type={2}
                        title={'Investments'}
                        data={investements}
                    />
                    <Card type={'0'} title={'Needs'} data={needs} />
                    <Card type={1} title={'Wants'} data={wants} />
                    <PieChart data={budget[index]} />
                </div>
            )
        )
    )
}

export default BudgetTiles
