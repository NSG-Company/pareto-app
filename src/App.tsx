import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Task } from './types/Task';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { TimeSpentChart } from './components/TimeSpentChart';
import { PriorityMatrix } from './components/PriorityMatrix';
import { ParetoChart } from './components/ParetoChart';
import { ImpactTimeChart } from './components/ImpactTimeChart';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    priority: '',
    status: '',
    searchTerm: '',
    isIncomeGenerating: false
  });

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = !filters.category || task.category === filters.category;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesSearch = !filters.searchTerm || 
      task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesIncome = !filters.isIncomeGenerating || task.isIncomeGenerating;
    
    return matchesCategory && matchesPriority && matchesStatus && matchesSearch && matchesIncome;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Pareto Tijdsmanagement
          </Typography>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Taak Toevoegen
                </Typography>
                <TaskForm onSubmit={handleAddTask} />
              </Paper>
            </Grid>
            <Grid xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Taken Overzicht
                </Typography>
                <TaskFilters 
                  filters={filters}
                  onFilterChange={setFilters}
                />
                <TaskList
                  tasks={filteredTasks}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <TimeSpentChart tasks={filteredTasks} />
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <PriorityMatrix tasks={filteredTasks} />
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <ParetoChart tasks={filteredTasks} />
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <ImpactTimeChart tasks={filteredTasks} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 