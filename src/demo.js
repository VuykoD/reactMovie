import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function ImgMediaCard(props) {
  const { poster, title, overview } = props;

  return (
    <Card  style={{display:'inline-block',boxShadow: '3px 3px 6px 3px rgba(122,122,122,0.5)',margin: '10px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          //className={classes.media}
          height="278"
          image={`https://image.tmdb.org/t/p/w185${poster}`}
          title="Contemplative Reptile"
          style={{width:'185px', display:'inline-block'}}
        />
      <CardContent style={{display:'inline-block', top:'0px', width:'385px'}}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography component="p">
          {overview}
        </Typography>
      </CardContent>
      </CardActionArea>
      <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
    </Card>
  );
}

export default ImgMediaCard;
