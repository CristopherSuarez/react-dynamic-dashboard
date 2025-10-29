import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Box } from '@mui/material'

import DashboardTabs from './components/DashboardTabs/DashboardTabs'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100vw',
          bgcolor: '#DCE3F0',
          transition: 'background-color 0.3s ease',
        }}
      >
        <DashboardTabs/>
      </Box>
    </QueryClientProvider>
  )
}

export default App
