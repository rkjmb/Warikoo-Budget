

import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

import { colorConfig } from '../../utils/budgetService';
import NumberFormat from 'react-number-format';

const BudgetGraph = ({ classes, budget, currentyear, totalEarnings, maturity }) => {

    return (
        // <ResponsiveContainer width="100%" height="100%">
        <>
            <LineChart
                width={500}
                height={300}
                data={budget}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis type="number" domain={[0, 'dataMax + 10000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="investements" stroke={colorConfig.investements} formatter={(value) => <NumberFormat value={value} thousandsGroupStyle='lakh'
                    displayType='text'
                    thousandSeparator
                    isNumericString
                    prefix="₹"
                />} />
                <Line type="monotone" dataKey="needs" stroke={colorConfig.needs} formatter={(value) => <NumberFormat value={value} thousandsGroupStyle='lakh'
                    displayType='text'
                    thousandSeparator
                    isNumericString
                    prefix="₹"
                />} />
                <Line type="monotone" dataKey="wants" stroke={colorConfig.wants} formatter={(value) => <NumberFormat value={value} thousandsGroupStyle='lakh'
                    displayType='text'
                    thousandSeparator
                    isNumericString
                    prefix="₹"
                />} />
            </LineChart>
            <BarChart
                width={500}
                height={300}
                data={totalEarnings.ciBreakDown}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 'dataMax + 10000']} />
                <Tooltip />
                <Legend />
                <Bar type="monotone" dataKey="investements" fill={colorConfig.investements} formatter={(value, _, y) => {

                    return <NumberFormat value={value} thousandsGroupStyle='lakh'
                        displayType='text'
                        thousandSeparator
                        isNumericString
                        prefix="₹"
                        suffix={` till ${y.payload.year}`}
                    />
                }} />
                <Bar type="monotone" dataKey="earnings" fill={colorConfig.earnings} formatter={(value) =>
                    <NumberFormat value={value} thousandsGroupStyle='lakh'
                        displayType='text'
                        thousandSeparator
                        isNumericString
                        prefix="₹"
                        suffix={` in ${currentyear + maturity}`}

                    />} />
            </BarChart>
        </>
        // </ResponsiveContainer>
    );
}

export default memo(BudgetGraph)