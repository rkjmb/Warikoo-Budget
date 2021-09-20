import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];

const BudgetGraph = ({ data: { needs, wants, investements } }) => {
    const data01 = [
        { name: 'Needs', value: needs },
        { name: 'Wants', value: wants },
        { name: 'Investments', value: investements }
    ];

    const data02 = [
        { name: 'A1', value: needs },
        { name: 'B1', value: wants },
        { name: 'C1', value: investements },
    ];

    return (
        // <ResponsiveContainer width="100%" height="100%">
        <PieChart width={125} height={125}>
            <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={40}>
                {data01.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={62.5}>
                {data02.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
        // </ResponsiveContainer>
    )
}

export default BudgetGraph
