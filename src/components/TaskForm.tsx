import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Slider, Typography, FormControlLabel, Switch } from '@mui/material';
import { Task } from '../types/Task';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [impact, setImpact] = useState(5);
  const [timeSpent, setTimeSpent] = useState(1);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [isIncomeGenerating, setIsIncomeGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      impact,
      timeSpent,
      category,
      priority,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      isIncomeGenerating
    });
    // Reset form
    setTitle('');
    setDescription('');
    setImpact(5);
    setTimeSpent(1);
    setCategory('');
    setPriority('medium');
    setStatus('todo');
    setIsIncomeGenerating(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Beschrijving"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Categorie</InputLabel>
        <Select
          value={category}
          label="Categorie"
          onChange={(e) => setCategory(e.target.value)}
          required
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
          value={priority}
          label="Prioriteit"
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          required
        >
          <MenuItem value="high">Hoog</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Laag</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography gutterBottom>Impact (1-10)</Typography>
        <Slider
          value={impact}
          onChange={(_, value) => setImpact(value as number)}
          min={1}
          max={10}
          marks
          valueLabelDisplay="auto"
        />
      </Box>
      <TextField
        label="Tijd besteed (uren)"
        type="number"
        value={timeSpent}
        onChange={(e) => setTimeSpent(Number(e.target.value))}
        required
        fullWidth
      />
      <FormControlLabel
        control={
          <Switch
            checked={isIncomeGenerating}
            onChange={(e) => setIsIncomeGenerating(e.target.checked)}
            color="primary"
          />
        }
        label="Deze taak draagt bij aan mijn inkomen"
      />
      <Button type="submit" variant="contained" color="primary">
        Taak Toevoegen
      </Button>
    </Box>
  );
}; 