import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Box, Typography } from '@mui/material'

import Dashboard from './components/Dashboard/Dashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-dvh w-dvw bg-gray-200 p-4">
        <Box marginBlock={3}>
          <Typography>React Dynamic Dashboard</Typography></Box>
        <Dashboard />
      </div>
    </QueryClientProvider>
  )
}

export default App
