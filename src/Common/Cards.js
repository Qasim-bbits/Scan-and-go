import React from 'react';
import {Avatar, Button, Card, CardContent, Grid, Typography} from '@mui/material';

function Cards(props) {
  const {
    largeText,
    largeTextSize,
    smallText,
    smallTextSize,
    smallTextWeight,
    button,
    buttonText,
    icon,
  } = props;
  return (
    <Card
    >
      <CardContent sx={{padding: 1.2}}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color='primary.main'
              variant={largeTextSize}
              fontWeight='bolder'
            >
              {largeText}
            </Typography>
            <Typography
              color="textPrimary"
              variant={smallTextSize}
              fontWeight={smallTextWeight ? smallTextWeight : ''}
            >
              {smallText}
            </Typography>
            {button ?
              <Button variant="outlined" size='small'>{buttonText}</Button> : null
            }
          </Grid>
          <Grid item>
            <Avatar
              variant='square'
              src={icon}
              sx={{height:65, width:65}}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Cards;
