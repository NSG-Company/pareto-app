import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Task } from '../types/Task';

interface PriorityMatrixProps {
  tasks: Task[];
}

export const PriorityMatrix: React.FC<PriorityMatrixProps> = ({ tasks }) => {
  // Filter taken op basis van impact en tijd
  const highImpactHighTime = tasks.filter(task => task.impact >= 7 && task.timeSpent >= 5);
  const highImpactLowTime = tasks.filter(task => task.impact >= 7 && task.timeSpent < 5);
  const lowImpactHighTime = tasks.filter(task => task.impact < 7 && task.timeSpent >= 5);
  const lowImpactLowTime = tasks.filter(task => task.impact < 7 && task.timeSpent < 5);

  // Tel inkomensverhogende taken per kwadrant
  const countIncomeGenerating = (tasks: Task[]) => {
    return tasks.filter(task => task.isIncomeGenerating).length;
  };

  const renderQuadrant = (
    title: string,
    tasks: Task[],
    color: string,
    incomeCount: number
  ) => (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        minHeight: 200,
        bgcolor: color,
        position: 'relative',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {tasks.length} taken
        {incomeCount > 0 && ` (${incomeCount} inkomensverhogend)`}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            sx={{
              mb: 1,
              p: 1,
              borderRadius: 1,
              bgcolor: task.isIncomeGenerating ? 'success.light' : 'background.paper',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {task.title}
            </Typography>
            <Typography variant="caption" display="block">
              Impact: {task.impact}/10 | Tijd: {task.timeSpent} uur
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Prioriteiten Matrix
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Verdeel je taken op basis van impact en tijdbesteding. Focus op taken met hoge impact en weinig tijd.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          {renderQuadrant(
            'Hoge Impact, Weinig Tijd',
            highImpactLowTime,
            'rgba(75, 192, 192, 0.1)',
            countIncomeGenerating(highImpactLowTime)
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderQuadrant(
            'Hoge Impact, Veel Tijd',
            highImpactHighTime,
            'rgba(255, 99, 132, 0.1)',
            countIncomeGenerating(highImpactHighTime)
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderQuadrant(
            'Lage Impact, Weinig Tijd',
            lowImpactLowTime,
            'rgba(255, 206, 86, 0.1)',
            countIncomeGenerating(lowImpactLowTime)
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderQuadrant(
            'Lage Impact, Veel Tijd',
            lowImpactHighTime,
            'rgba(153, 102, 255, 0.1)',
            countIncomeGenerating(lowImpactHighTime)
          )}
        </Grid>
      </Grid>
    </Box>
  );
}; 