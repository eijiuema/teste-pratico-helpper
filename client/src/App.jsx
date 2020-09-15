import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import FormCliente from './FormCliente';
import TableClientes from './TableClientes';

function App() {

  const [data, setData] = useState([]);

  const refresh = (response) => {
    fetchData();
  };

  const fetchData = async () => {
    const data = await window.fetch('http://localhost:3001/api/clientes').then(response => response.json());
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h2'>Teste prático - Helpper</Typography>
        </Grid>
        <Grid item container xs={12} lg={3}>
          <FormCliente afterSubmit={refresh} />
        </Grid>
        <Grid item container xs={12} lg={9}>
          <TableClientes data={data} afterDelete={refresh}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
