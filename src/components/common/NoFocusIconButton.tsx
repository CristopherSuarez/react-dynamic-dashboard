import styled from '@emotion/styled';

import { IconButton } from '@mui/material';

export const NoFocusIconButton = styled(IconButton)({
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
});
