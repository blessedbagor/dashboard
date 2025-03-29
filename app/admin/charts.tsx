'use client';
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const MonthlySalesOverviewCharts = ({
    data: {salesData}, 
}: {
    data: {salesData: {month: string; totalSales: number} []};

}) => {
    return <ResponsiveContainer width='100%' height={350}>
        <BarChart data={salesData}>
            <XAxis
                dataKey='month'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>`$${value}`}
            />
            <Bar 
            dataKey='totalSales'
            fill='currentColor'
            radius={[30,30,0,0]}
            className='fill-yellow-500'
            />
        </BarChart>
    </ResponsiveContainer>;
}
 
export default MonthlySalesOverviewCharts;