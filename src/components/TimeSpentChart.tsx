import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Task } from '../types/Task';

interface TimeSpentChartProps {
  tasks: Task[];
}

export const TimeSpentChart: React.FC<TimeSpentChartProps> = ({ tasks }) => {
  // Groepeer taken per categorie en bereken totale tijd
  const data = tasks.reduce((acc: { [key: string]: number }, task) => {
    acc[task.category] = (acc[task.category] || 0) + task.timeSpent;
    return acc;
  }, {});

  // Converteer naar het formaat dat Recharts verwacht
  const chartData = Object.entries(data).map(([category, timeSpent]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1), // Maak eerste letter hoofdletter
    uren: timeSpent
  }));

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Waar besteed je je tijd aan?
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Dit diagram laat zien hoeveel uur je besteedt aan verschillende categorieën
      </Typography>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value} uur`, 'Tijd']}
            labelFormatter={(label) => `Categorie: ${label}`}
          />
          <Bar dataKey="uren" fill="#8884d8" name="Uren" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}; 