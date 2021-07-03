import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import ComicCard from './ComicCard'
import { getComics, getComicsByCharactersName } from '../services/api'
import SearchField from "./SearchField";

const MainContainer: React.FC = () => {

  const [offset, setOffset] = useState(0)
  const [comics, setComics] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState(false);

  useEffect(() => {

    async function getItems() {
      try {
        if (!filter) {

          const result = await getComics(offset)
          // Set comics in state
          setComics(result.data.results)

          // Set pages in state
          const pages = Math.round(parseInt(result.data.total) / 10)
          setTotalPages(pages)

        } else {
          // User decided to search by a character name

          // Reset page
          setPage(1)

          const result = await getComicsByCharactersName(name, 0)

          // // Set comics in state
          // setComics(result.data.results)

          // // Set pages in state
          // const pages = Math.round(parseInt(result.data.total) / 10)
          // setTotalPages(pages)

        }

      } catch (error) {
        console.log("Ocorreu um erro ao consultas os quadrinhos");
      }
    }
    getItems();

  }, [offset])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value == 1)
      setOffset(0)
    else
      setOffset(value * 10)
    setPage(value);
  };

  if (comics.length === 0)
    return (
      <Container>
        <h1>Nenhuma Comic disponível</h1>
      </Container>
    )

  return (
    // <Container maxWidth={false}>

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SearchField />
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          {
            comics.map((comic, index) => (
              <Grid item key={comic.id}>
                <ComicCard comic={comic} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>

      {
        totalPages > 0 &&
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
          </Box>
        </Grid>
      }
    </Grid>

    // </Container>
  )
}

export default MainContainer
