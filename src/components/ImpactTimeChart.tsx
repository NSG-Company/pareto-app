import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Task } from '../types/Task';

interface ImpactTimeChartProps {
  tasks: Task[];
}

export const ImpactTimeChart: React.FC<ImpactTimeChartProps> = ({ tasks }) => {
  // Bereken totale tijd per categorie
  const timePerCategory = tasks.reduce((acc: { [key: string]: number }, task) => {
    acc[task.category] = (acc[task.category] || 0) + task.timeSpent;
    return acc;
  }, {});

  // Bereken tijd voor inkomensverhogende taken
  const incomeGeneratingTime = tasks
    .filter(task => task.isIncomeGenerating)
    .reduce((sum, task) => sum + task.timeSpent, 0);

  const totalTime = tasks.reduce((sum, task) => sum + task.timeSpent, 0);
  const incomePercentage = (incomeGeneratingTime / totalTime) * 100;

  const categories = [
    { 
      title: 'Inkomensverhogende Taken', 
      color: '#00C851', 
      description: `Je besteedt ${incomePercentage.toFixed(1)}% van je tijd aan taken die bijdragen aan je inkomen.`,
      tasks: tasks.filter(task => task.isIncomeGenerating)
    },
    { 
      title: 'Overige Taken', 
      color: '#ff4444', 
      description: `Je besteedt ${(100 - incomePercentage).toFixed(1)}% van je tijd aan taken die niet direct bijdragen aan je inkomen.`,
      tasks: tasks.filter(task => !task.isIncomeGenerating)
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Inkomensverhogende vs. Overige Taken
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Deze indeling laat zien hoeveel tijd je besteedt aan taken die bijdragen aan je inkomen
      </Typography>
      <Grid container spacing={2}>
        {categories.map(({ title, color, description, tasks }) => (
          <Grid item xs={12} key={title}>
            <Paper sx={{ p: 2, bgcolor: `${color}20` }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {description}
              </Typography>
              {tasks.map((task) => (
                <Box key={task.id} sx={{ mb: 1, p: 1, bgcolor: 'white', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tijd: {task.timeSpent} uur | Impact: {task.impact}/10
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 