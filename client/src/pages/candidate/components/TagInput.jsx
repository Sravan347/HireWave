import React, { useState } from "react";
import { X } from "lucide-react";
import { TextField, Chip, Button, Box, IconButton, Typography } from '@mui/material';

const TagInput = ({ tags = [], setTags }) => {
  const [input, setInput] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    const newTag = input.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInput("");
  };

  const removeTag = (index) => {
    const updated = tags.filter((_, i) => i !== index);
    setTags(updated);
  };

  return (
    <Box sx={{ space: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#0A1A4A', mb: 1 }}>
        Tags / Skills
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => removeTag(index)}
            deleteIcon={<X size={12} />}
            sx={{
              backgroundColor: '#D6CEFA',
              color: '#0A1A4A',
              '& .MuiChip-deleteIcon': {
                color: '#0A1A4A',
                '&:hover': {
                  color: '#dc2626',
                },
              },
            }}
          />
        ))}
      </Box>

      <Box component="form" onSubmit={addTag} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          type="text"
          value={input}
          placeholder="Type and press Enter"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTag(e);
          }}
          size="small"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#1A3A8F',
              },
              '&:hover fieldset': {
                borderColor: '#7F5AF0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7F5AF0',
              },
            },
          }}
        />
        <Button 
          type="submit" 
          variant="contained"
          sx={{
            backgroundColor: '#1A3A8F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0A1A4A',
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default TagInput;
