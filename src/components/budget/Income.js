import React from 'react'
import NumberFormat from 'react-number-format';

// import incomeImage from '../../assets/budget/income.svg'

const Income = ({ income }) => {
    return (
        <div style={{ width: '100%', position: 'relative', height: 125, borderRadius: '1em', padding: '1em', boxShadow: '0px 0px 0.5em', textTransform: 'capitalize' }}>
            {/* <img style={{ position: 'absolute' }} src={incomeImage} alt='income' /> */}
            <p>{'Income'}</p>
            <p>{income ? <NumberFormat value={income} thousandsGroupStyle='lakh'
                displayType='text'
                thousandSeparator
                isNumericString
                prefix="₹" /> : '---'}
            </p>
            <p>{income ? <NumberFormat value={Math.floor(income / 12)} thousandsGroupStyle='lakh'
                displayType='text'
                thousandSeparator
                isNumericString
                prefix="₹" /> : '---'}/m
            </p>
        </div>
    )
}

export default Income
