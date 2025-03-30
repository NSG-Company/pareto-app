import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
  };

  const handleSave = () => {
    if (editingTask) {
      onUpdateTask(editingTask);
      handleCloseDialog();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'todo':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ mt: 2 }}>
      <List>
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <ListItem
              sx={{
                bgcolor: task.isIncomeGenerating ? 'success.light' : 'background.paper',
                '&:hover': {
                  bgcolor: task.isIncomeGenerating ? 'success.light' : 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {task.title}
                    </Typography>
                    {task.isIncomeGenerating && (
                      <Chip
                        label="Inkomensverhogend"
                        size="small"
                        color="success"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={`Impact: ${task.impact}/10`}
                        size="small"
                        color="primary"
                      />
                      <Chip
                        label={`${task.timeSpent} uur`}
                        size="small"
                        color="secondary"
                      />
                      <Chip
                        label={task.category}
                        size="small"
                        color="info"
                      />
                      <Chip
                        label={task.priority}
                        size="small"
                        color={getPriorityColor(task.priority)}
                      />
                      <Chip
                        label={task.status}
                        size="small"
                        color={getStatusColor(task.status)}
                      />
                    </Box>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(task)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < tasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Taak Bewerken</DialogTitle>
        <DialogContent>
          {editingTask && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Titel"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Beschrijving"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Categorie</InputLabel>
                <Select
                  value={editingTask.category}
                  label="Categorie"
                  onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                >
                  <MenuItem value="werk">Werk</MenuItem>
                  <MenuItem value="persoonlijk">Persoonlijk</MenuItem>
                  <MenuItem value="gezin">Gezin</MenuItem>
                  <MenuItem value="hobby">Hobby</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Prioriteit</InputLabel>
                <Select
                  value={editingTask.priority}
                  label="Prioriteit"
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                >
                  <MenuItem value="high">Hoog</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Laag</MenuItem>
                </Select>
              </FormControl>
              <Box>
                <Typography gutterBottom>Impact (1-10)</Typography>
                <Slider
                  value={editingTask.impact}
                  onChange={(_, value) => setEditingTask({ ...editingTask, impact: value as number })}
                  min={1}
                  max={10}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
              <TextField
                label="Tijd besteed (uren)"
                type="number"
                value={editingTask.timeSpent}
                onChange={(e) => setEditingTask({ ...editingTask, timeSpent: Number(e.target.value) })}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuleren</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Opslaan
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}; 