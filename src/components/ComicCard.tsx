import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '16px'
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          title="Titulo da comic"
        />
        <CardMedia
          component="img"
          alt="Comic image"
          height="240"
          image="https://upload.wikimedia.org/wikipedia/commons/1/1e/Front_cover%2C_%22Wow_Comics%22_no._38_%28art_by_Jack_Binder%29.jpg"
          title="Comic image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Comic title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Comic description
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Favoritar
          {/* <FavoriteIcon /> */}
        </Button>
        <Button size="small" color="primary">
          Ver mais
        </Button>
      </CardActions>
    </Card>
  );
}
