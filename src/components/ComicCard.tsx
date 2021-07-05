import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core'
import DetailComic from './DetailComic'

interface Thumbnail {
  path: string
  extension: string
}

interface Creator {
  name: string
  role: string
}

interface Creators {
  collectionURI: string
  items: Creator[]
}

interface Comic {
  id: number
  title: string
  description?: string | null
  creators: Creators
  thumbnail: Thumbnail
  pageCount: number
}

interface Props {
  comic: Comic
}

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: '16px',
  },
})

const ComicCard: React.FC<Props> = ({ comic }) => {
  const classes = useStyles()
  const { id, title, creators, thumbnail } = comic

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <Card className={classes.root} key={id} data-testid='comicCard'>
      <CardMedia
        component='img'
        alt='Comic image'
        image={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
        title='Comic image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {title}
        </Typography>
        {creators.items.length > 0 ? (
          creators.items.map((creator: Creator) => (
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              key={creator.name}
            >
              {`${creator.name} - ${creator.role}`}
            </Typography>
          ))
        ) : (
          <></>
        )}
      </CardContent>
      <CardActions>
        <Button
          data-testid='seeMore'
          size='small'
          color='primary'
          onClick={handleClickOpen}
        >
          Ver mais sobre
        </Button>

        <DetailComic
          comic={comic}
          open={open}
          setOpen={(newValue: boolean) => setOpen(newValue)}
        />
      </CardActions>
    </Card>
  )
}

export default ComicCard
