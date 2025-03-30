import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Task } from '../types/Task';

interface ParetoChartProps {
  tasks: Task[];
}

export const ParetoChart: React.FC<ParetoChartProps> = ({ tasks }) => {
  // Filter inkomensverhogende taken
  const incomeGeneratingTasks = tasks.filter(task => task.isIncomeGenerating);
  
  // Sorteer op impact
  const sortedTasks = [...incomeGeneratingTasks].sort((a, b) => b.impact - a.impact);

  // Bereken totale impact van inkomensverhogende taken
  const totalImpact = sortedTasks.reduce((sum, task) => sum + task.impact, 0);

  // Neem de top 5 taken
  const topTasks = sortedTasks.slice(0, 5);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Je Meest Inkomensverhogende Taken
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Deze 5 taken dragen het meest bij aan je inkomen. Focus hier vooral op!
      </Typography>
      <Paper sx={{ mt: 2 }}>
        <List>
          {topTasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        #{index + 1}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {task.description}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                        Impact: {task.impact}/10 ({(task.impact / totalImpact * 100).toFixed(1)}% van totale inkomensimpact)
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < topTasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}; 