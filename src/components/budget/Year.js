import React from 'react'
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const styles = { width: '100%', background: '#0088FE', color: 'white', height: 125, borderRadius: '1em', padding: '1em', boxShadow: '0px 0px 0.5em' }

const Income = ({ year, data, showIcon }) => {
    return (
        <div style={styles}>
            <Typography variant={'h6'} gutterBottom>{`${year || 'Year 1'}`}{showIcon ? <ArrowUpwardIcon fontSize="small" /> : <></>}</Typography>
            <p>{data ? <NumberFormat value={data} thousandsGroupStyle='lakh'
                displayType='text'
                thousandSeparator
                isNumericString
                prefix="₹" /> : '---'}
            </p>
            <p>
                {data ? <NumberFormat value={Math.floor(data / 12)} thousandsGroupStyle='lakh'
                    displayType='text'
                    thousandSeparator
                    isNumericString
                    prefix="₹" /> : '---'}/m
            </p>
        </div>
    )
}

export default Income
