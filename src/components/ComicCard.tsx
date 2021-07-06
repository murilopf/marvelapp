import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  useMediaQuery,
  Theme,
  createStyles,
} from '@material-ui/core'
import DetailComic from './DetailComic'

interface Thumbnail {
  path: string
  extension: string
}

interface Image {
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
  images: Image[]
}

interface Props {
  comic: Comic
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
      margin: theme.spacing(2),
      transition: 'transform .3s',
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          transform: `scale(1.1)`,
        },
      },
    },
    cardTitle: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: `Roboto Condensed, sans-serif`,
      [theme.breakpoints.up('sm')]: {
        minHeight: '100px',
      },
    },
    btnSeeMore: {
      margin: theme.spacing(2),
    },
    divCreators: {
      maxHeight: '150px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
)

const ComicCard: React.FC<Props> = ({ comic }) => {
  const classes = useStyles()
  const { id, title, creators, thumbnail } = comic
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <Card className={classes.root} key={id} data-testid='comicCard'>
      <CardActionArea onClick={handleClickOpen} data-testid='seeMore'>
        <CardMedia
          component='img'
          alt='Comic image'
          image={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
          title='Comic image'
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='h2'
            className={classes.cardTitle}
          >
            {title}
          </Typography>
          {/* <div className={classes.divCreators}>
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
          </div> */}
        </CardContent>

        {/* <CardActions> */}
        {isMobile ? (
          <Button
            size='small'
            color='primary'
            onClick={handleClickOpen}
            className={classes.btnSeeMore}
          >
            Ver mais sobre
          </Button>
        ) : (
          <></>
        )}
        {/* </CardActions> */}
      </CardActionArea>
      <DetailComic
        comic={comic}
        open={open}
        setOpen={(newValue: boolean) => setOpen(newValue)}
      />
    </Card>
  )
}

export default ComicCard
