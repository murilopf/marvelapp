import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { getComics, getComicsByCharactersName } from '../services/api'
import ComicCard from './ComicCard'
import SearchField from './SearchField';
import SkeletonComicCard from './Skeletons/SkeletonComicCard';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Creator {
  name: string;
  role: string;
}

interface Creators {
  collectionURI: string;
  items: Creator[];
}

interface Comic {
  id: number;
  title: string;
  description?: string | null;
  creators: Creators;
  thumbnail: Thumbnail;
  pageCount: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#f5f5f5'
    },
  }),
);

const MainContainer: React.FC = () => {

  const classes = useStyles();

  const [offset, setOffset] = useState<number>(0)
  const [comics, setComics] = useState<Comic[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {

    async function getItems() {
      try {
        setIsLoading(true)

        if (!filterValue) {

          const result = await getComics(offset)
          // Set comics in state
          setComics(result.data.results)

          // Set pages in state
          const pages = Math.round(parseInt(result.data.total) / 10)
          setTotalPages(pages)


        } else {
          // User decided to search by a character name

          // Reset page
          if (offset === 0)
            setPage(1)

          const result = await getComicsByCharactersName(filterValue, 0, offset)

          // // Set comics in state
          setComics(result.data.results)

          // // Set pages in state
          const pages = Math.round(parseInt(result.data.total) / 10)
          setTotalPages(pages)

        }

        setIsLoading(false)

      } catch (error) {
        setComics([])
        setTotalPages(0)
        setPage(1)
        setIsLoading(false)
      }
    }
    getItems();

  }, [offset, filterValue])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value == 1)
      setOffset(0)
    else
      setOffset(value * 10)
    setPage(value);
    setIsLoading(true)
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchField
            setFilterValue={setFilterValue}
            setIsLoading={setIsLoading}
          />
        </Grid>

        <Grid item xs={12}>
          {
            comics.length === 0 && !isLoading ?
              <Grid container justify='center'>
                <Alert severity="info">Não encontramos nenhuma comic com este nome 😭</Alert>
              </Grid>
              :
              <Grid container justify="center">
                {
                  isLoading ?
                    [...Array(10)].map((e, i) => <SkeletonComicCard key={i} />)
                    :
                    comics.map((comic, index) => (
                      <Grid item key={comic.id}>
                        <ComicCard comic={comic} />
                      </Grid>
                    ))
                }
              </Grid>
          }
        </Grid>

        {
          totalPages > 0 &&
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" m={2}>
              <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
            </Box>
          </Grid>
        }
      </Grid>
    </div>
  )
}

export default MainContainer
