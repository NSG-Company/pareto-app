import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
  Paper,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Task } from '../types/Task';

interface TaskFiltersProps {
  filters: {
    category: string;
    priority: string;
    status: string;
    searchTerm: string;
    isIncomeGenerating: boolean;
  };
  onFilterChange: (filters: {
    category: string;
    priority: string;
    status: string;
    searchTerm: string;
    isIncomeGenerating: boolean;
  }) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Zoeken"
          value={filters.searchTerm}
          onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Categorie</InputLabel>
          <Select
            value={filters.category}
            label="Categorie"
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="werk">Werk</MenuItem>
            <MenuItem value="persoonlijk">Persoonlijk</MenuItem>
            <MenuItem value="gezin">Gezin</MenuItem>
            <MenuItem value="hobby">Hobby</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Prioriteit</InputLabel>
          <Select
            value={filters.priority}
            label="Prioriteit"
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="high">Hoog</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Laag</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="todo">Te Doen</MenuItem>
            <MenuItem value="in_progress">Bezig</MenuItem>
            <MenuItem value="done">Afgerond</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={filters.isIncomeGenerating}
              onChange={(e) => onFilterChange({ ...filters, isIncomeGenerating: e.target.checked })}
              color="success"
            />
          }
          label="Alleen inkomensverhogende taken"
        />
      </Box>
    </Paper>
  );
}; 