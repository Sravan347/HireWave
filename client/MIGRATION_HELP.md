# Tailwind to MUI Migration Automation Script

This PowerShell script helps automate the migration process for remaining components.

## Usage
```powershell
# Run from the client directory
.\migrate-components.ps1
```

## Manual Migration Steps for Each Component

### 1. Import Statements
Replace:
```jsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
```

With:
```jsx
import { TextField, Button, Card, CardContent, CardHeader, Box, Typography } from "@mui/material";
```

### 2. Common Class Replacements

| Tailwind Class | MUI Equivalent |
|---|---|
| `className="flex"` | `sx={{ display: 'flex' }}` |
| `className="flex-col"` | `sx={{ flexDirection: 'column' }}` |
| `className="items-center"` | `sx={{ alignItems: 'center' }}` |
| `className="justify-between"` | `sx={{ justifyContent: 'space-between' }}` |
| `className="gap-4"` | `sx={{ gap: 2 }}` |
| `className="p-4"` | `sx={{ p: 2 }}` |
| `className="mb-4"` | `sx={{ mb: 2 }}` |
| `className="text-center"` | `sx={{ textAlign: 'center' }}` |
| `className="w-full"` | `fullWidth` (for form components) |
| `className="rounded-lg"` | `sx={{ borderRadius: 2 }}` |
| `className="shadow-md"` | `elevation={2}` (for Paper/Card) |

### 3. Color Classes

| Tailwind | MUI |
|---|---|
| `text-white` | `color="white"` |
| `text-gray-600` | `color="text.secondary"` |
| `bg-white` | `sx={{ backgroundColor: 'background.paper' }}` |
| `bg-blue-500` | `color="primary"` |
| `hover:bg-blue-600` | `sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}` |

### 4. Typography Migration

```jsx
// Before
<h1 className="text-2xl font-bold text-gray-900">Title</h1>
<p className="text-sm text-gray-600">Description</p>

// After
<Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Title</Typography>
<Typography variant="body2" color="text.secondary">Description</Typography>
```

### 5. Form Components

```jsx
// Before
<input className="w-full border rounded-md p-2" />
<button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>

// After
<TextField fullWidth variant="outlined" />
<Button variant="contained" color="primary">Submit</Button>
```

### 6. Layout Components

```jsx
// Before
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// After
<Container maxWidth="lg">
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
```

## Component-Specific Migration Notes

### Authentication Forms
- Replace form inputs with `TextField`
- Use `Button` with `variant="contained"`
- Wrap in `Paper` or `Card` for styling
- Use `Box` for layout instead of `div`

### Dashboard Components
- Replace cards with MUI `Card`
- Use `Typography` for headings
- Replace icons with MUI icons or keep Lucide
- Use `Grid` for layout

### Data Tables
- Consider using `@mui/x-data-grid` for complex tables
- Use `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell` for simple tables

### Modals/Dialogs
- Replace with MUI `Dialog`
- Use `DialogTitle`, `DialogContent`, `DialogActions`

### Navigation
- Already migrated to `AppBar`
- Use `Drawer` for side navigation
- `Tabs` for tab navigation

## Testing Each Migrated Component

1. Check visual appearance
2. Test responsive behavior
3. Verify functionality
4. Check accessibility
5. Test dark mode (if applicable)

## Common Issues and Solutions

### Issue: Styling not applied
**Solution**: Make sure ThemeProvider wraps the component

### Issue: Icons not displaying
**Solution**: Import MUI icons or continue using Lucide icons

### Issue: Layout broken
**Solution**: Check Grid and Box usage, ensure proper spacing

### Issue: Colors don't match
**Solution**: Use custom theme colors or sx prop for specific styling

## Final Steps

1. Remove unused Tailwind components from `ui/` folder
2. Update imports throughout the application
3. Remove Tailwind from `vite.config.js`
4. Remove Tailwind CSS imports from `index.css`
5. Test entire application
6. Update package.json to remove Tailwind dependencies
