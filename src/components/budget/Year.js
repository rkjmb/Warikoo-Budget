import React from 'react'
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';

const styles = { width: '100%', background: '#0088FE', color: 'white', height: 125, borderRadius: '1em', padding: '1em', boxShadow: '0px 0px 0.5em' }

const Income = ({ year, raise }) => {
    return (
        <div style={styles}>
            <Typography variant={'h6'} gutterBottom>{`${year || 'Year 1'}`}</Typography>
            <p>{raise ? <NumberFormat value={raise} thousandsGroupStyle='lakh'
                displayType='text'
                thousandSeparator
                isNumericString
                prefix="₹" /> : '---'}
            </p>
            <p>
                {raise ? <NumberFormat value={Math.floor(raise / 12)} thousandsGroupStyle='lakh'
                    displayType='text'
                    thousandSeparator
                    isNumericString
                    prefix="₹" /> : '---'}/m
            </p>
        </div>
    )
}

export default Income
