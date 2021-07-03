import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import DetailComic from './DetailComic'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: '16px'
  },
});

const ComicCard = (props: any) => {
  const classes = useStyles();
  const { id, title, description, creators, thumbnail, images } = props.comic

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        alt="Comic image"
        image={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
        title="Comic image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
        >
          {title}
        </Typography>
        {
          creators.items.length > 0 ?
            creators.items.map((creator: { name: string; role: string; }) => {
              return (
                <Typography variant="body2" color="textSecondary" component="p" key={creator.name}>
                  {creator.name + " - " + creator.role}
                </Typography>
              )
            })
            : <></>
        }
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Ver mais sobre
        </Button>

        <DetailComic
          comic={props.comic}
          open={open}
          setOpen={(newValue: boolean) => setOpen(newValue)}
        />
      </CardActions>
    </Card>
  );
}

export default ComicCard
