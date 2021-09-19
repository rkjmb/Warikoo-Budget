const views = {
    tiles: {
        pageTitle: 'Tiles view',
        value: 'tiles'
    },
    graph: {
        pageTitle: 'Graph view',
        value: 'graph'

    },
    portfolio: {
        pageTitle: 'Portfolio breakdown',
        value: 'portfolio'
    },
}

const colorConfig = {
    investements: '#00C49F',
    needs: '#FF8042',
    wants: '#FFBB28',
    earnings: '#82ca9d',
    equity: '#0acdff',
    gold: '#db7c26',
    crypto: '#495867',
    emergency: '#c30011',
    insurance: '#2dc653'

}

const profileConfig = [
    {
        color: '#06d6a0', name: 'LOW',
        roi: '0.1'
    },
    {
        color: '#ffd60a', name: 'Medium',
        roi: '0.2'
    },
    {
        color: '#d62828', name: 'HIGH',
        roi: '0.3'
    },
]

const portfolio = [
    [
        { name: 'equity', value: 40 },
        { name: 'gold', value: 40 },
        { name: 'emergency', value: 10 },
        { name: 'insurance', value: 10 },
    ],
    [
        { name: 'equity', value: 50 },
        { name: 'gold', value: 30 },
        { name: 'crypto', value: 5 },
        { name: 'emergency', value: 10 },
        { name: 'insurance', value: 5 }
    ],
    [
        { name: 'equity', value: 70 },
        { name: 'gold', value: 10 },
        { name: 'crypto', value: 10 },
        { name: 'emergency', value: 5 },
        { name: 'insurance', value: 5 }
    ]
]

export { views, colorConfig, profileConfig, portfolio }
