import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

const handleUpload = async (e) => {
    console.log(e);
}

export default function AddSubject() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span" onClick={(e) => handleUpload(e.target.value)}>
          Upload An Image
        </Button>
      </label>
    </Stack>
  );
}