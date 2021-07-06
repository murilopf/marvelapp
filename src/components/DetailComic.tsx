/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Divider,
  Grid,
  Box,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'

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

interface IDetailComic {
  id: number
  title: string
  description?: string | null
  creators: Creators
  thumbnail: Thumbnail
  pageCount: number
  images: Image[]
}

interface Props {
  comic: IDetailComic
  open: any
  setOpen: any
}

interface ImageToZoom {
  image: Image
  open: boolean
  showZoom: any
  fullScreen: boolean
}

const useStyles = makeStyles({
  mainTitle: {
    fontFamily: `Roboto Condensed, sans-serif`,
    fontSize: '32px',
  },
  title: {
    fontFamily: `Roboto Condensed, sans-serif`,
    fontSize: '24px',
  },
  divider: {
    marginTop: '16px',
  },
})

const ImageZoom: React.FC<ImageToZoom> = ({
  image,
  open,
  showZoom,
  fullScreen,
}) => {
  const handleCloseZoom = () => {
    showZoom(false)
  }

  return (
    <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      onClick={handleCloseZoom}
      fullScreen={fullScreen}
    >
      <DialogContent>
        {fullScreen ? (
          <Box mt={1} mb={1}>
            <Alert severity='info'>
              Clique na tela novamente para fechar 💡
            </Alert>
          </Box>
        ) : (
          <></>
        )}
        <img src={`${image.path}.${image.extension}`} alt='' />
      </DialogContent>
    </Dialog>
  )
}

const DetailComic: React.FC<Props> = ({ open, setOpen, comic }) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { title, description, creators, thumbnail, pageCount, images } = comic

  const [openZoom, setOpenZoom] = useState<boolean>(false)
  const [imageToZoom, setImageToZoom] = useState<Image>()

  const handleClose = () => {
    setOpen(false)
  }

  const handleZoomImage = (image: Image) => {
    setOpenZoom(true)
    setImageToZoom(image)
  }

  const htmlDecode = (input: string) => {
    const e = document.createElement('div')
    e.innerHTML = input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  }

  return (
    <div data-testid='detailComic'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        fullScreen={fullScreen}
        maxWidth='md'
        scroll='paper'
      >
        <DialogContent dividers>
          <Grid container>
            <Grid item sm={5} xs={12}>
              <img
                src={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
                alt=''
              />
            </Grid>

            <Grid container item sm={7} xs={12}>
              <Grid item sm={12} xs={12}>
                <Typography gutterBottom className={classes.mainTitle}>
                  {title}
                </Typography>
              </Grid>

              {description ? (
                <Grid item sm={12} xs={12}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    className={classes.title}
                  >
                    Descrição
                  </Typography>

                  <Typography variant='body2' gutterBottom>
                    {htmlDecode(description)}
                  </Typography>
                  <Divider className={classes.divider} />
                </Grid>
              ) : (
                <></>
              )}

              {creators.items.length > 0 ? (
                <Grid item sm={12} xs={12}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    className={classes.title}
                  >
                    Autores
                  </Typography>
                  {creators.items.map((creator: Creator) => (
                    <Typography variant='body2' gutterBottom key={creator.name}>
                      {`${creator.name} - ${creator.role}`}
                    </Typography>
                  ))}
                  <Divider className={classes.divider} />
                </Grid>
              ) : (
                <></>
              )}

              {pageCount ? (
                <Grid item sm={12} xs={12}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    className={classes.title}
                  >
                    Número de páginas
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    {pageCount}
                  </Typography>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>

            {images && images.length > 1 ? (
              <Grid container spacing={1}>
                <Grid item sm={12} xs={12}>
                  <Divider className={classes.divider} />
                  <Typography
                    variant='h6'
                    gutterBottom
                    className={classes.title}
                  >
                    Outras imagens
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12}>
                  {images.map(image => (
                    <Button onClick={() => handleZoomImage(image)}>
                      <img
                        src={`${image.path}/portrait_medium.${image.extension}`}
                        alt=''
                      />
                    </Button>
                  ))}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            data-testid='backButton'
          >
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
      {imageToZoom ? (
        <ImageZoom
          image={imageToZoom}
          open={openZoom}
          showZoom={setOpenZoom}
          fullScreen={fullScreen}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default DetailComic
