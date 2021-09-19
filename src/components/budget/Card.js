import React from 'react'
import NumberFormat from 'react-number-format';

const styles = { width: '100%', color: 'white', height: 125, borderRadius: '1em', padding: '1em', boxShadow: '0px 0px 0.5em' }

const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];

const Card = ({ type, title, data, color }) => {
    return (
        <div style={{ ...styles, background: color || COLORS[type % COLORS.length] || '#fca311' }}>
            <p>{title || 'Card'}</p>

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

export default Card
