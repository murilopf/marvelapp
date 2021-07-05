import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

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

interface DetailComic {
  id: number;
  title: string;
  description?: string | null;
  creators: Creators;
  thumbnail: Thumbnail;
  pageCount: number
}

interface Props {
  comic: DetailComic;
  open: any;
  setOpen: any;
}

const DetailComic: React.FC<Props> = ({ open, setOpen, comic }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { title, description, creators, thumbnail, pageCount } = comic

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={fullScreen}
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers>

          <Box display="flex" justifyContent="center">
            <img src={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`} alt="" />
          </Box>

          {
            description ?
              <>
                <Typography variant="h6" gutterBottom>
                  Descrição
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
              </>
              : <></>
          }
          {
            creators.items.length > 0 ?
              <>
                <Typography variant="h6" gutterBottom>
                  Autores
                </Typography>
                {
                  creators.items.map((creator: Creator) => {
                    return (
                      <Typography variant="body2" gutterBottom key={creator.name}>
                        {creator.name + " - " + creator.role}
                      </Typography>
                    )
                  })
                }
              </>
              : <></>
          }

          {
            pageCount ?
              <>
                <Typography variant="h6" gutterBottom>
                  Número de páginas
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {pageCount}
                </Typography>
              </>
              : <></>
          }

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DetailComic
