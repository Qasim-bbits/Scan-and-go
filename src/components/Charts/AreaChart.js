import { Typography } from '@mui/material';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AreaRechart(props) {

    return (
        <>
            <Typography variant="h6" p={3} color={props.titleColor}>
                {props.title}
            </Typography>
            <ResponsiveContainer width="100%" height={props.height}>
                <AreaChart
                    width={500}
                    height={400}
                    data={props.data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.xDataKey} />
                    <YAxis label={{ value: 'Amount in $', angle: -90, position: 'insideLeft', fill: props.stroke }} />
                    <Tooltip />
                    <Area type="monotone" dataKey={props.yDataKey} stroke={props.stroke} fill={props.fill} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}