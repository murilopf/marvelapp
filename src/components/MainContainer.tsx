import React from "react";
import { Container, Grid, Box } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import ComicCard from './ComicCard'

const MainContainer: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Ajustar conforme o response */}
          <Grid container>
            <Grid item>
              <ComicCard />
            </Grid>
            <Grid item>
              <ComicCard />
            </Grid>
            <Grid item>
              <ComicCard />
            </Grid>
            <Grid item>
              <ComicCard />
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
            <Pagination count={10} color="primary" />
          </Box>
        </Grid>
      </Grid>


    </Container>
  )
}

export default MainContainer
