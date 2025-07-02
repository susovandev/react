import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useAppSelector } from '../app/hooks'

interface IData {
    name: string
    value: number
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const UserStatsChart = () => {
    const { userInfo } = useAppSelector((state) => state.user)

    const statusData = userInfo?.reduce((acc: IData[], curr) => {
        const existing = acc.find((item) => item.name === curr.status)
        if (existing) {
            existing.value += 1
        } else {
            acc.push({
                name: curr.status
                    .split(' ')
                    .map(
                        (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                    )
                    .join(' '),
                value: 1,
            })
        }
        return acc
    }, [])

    return (
        <div className="p-4 rounded shadow-md bg-gray-100 dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4">User Status Distribution</h2>
            <PieChart width={700} height={350}>
                <Pie
                    data={statusData}
                    cx={300}
                    cy={150}
                    labelLine={false}
                    label={({ name, percent }) =>
                        `${name}: ${(percent! * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {statusData.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

export default UserStatsChart
