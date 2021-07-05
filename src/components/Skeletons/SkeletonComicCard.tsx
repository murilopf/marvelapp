import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  Typography,
  Box
} from '@material-ui/core';

const SkeletonComicCard: React.FC = () => {
  return (
    <Box m={2}>
      <Skeleton variant="rect" width={300} height={450} animation="wave" />
      <Typography variant="h5" component="h2" >
        <Skeleton width={300} animation="wave" />
      </Typography>

      <Typography gutterBottom variant="body1" color="textSecondary" component="h5" >
        <Skeleton width={300} animation="wave" />
      </Typography>

      <Skeleton variant="rect" animation="wave" width={107} />
    </Box>
  );
}

export default SkeletonComicCard
