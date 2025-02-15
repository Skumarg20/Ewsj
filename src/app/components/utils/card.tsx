"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

type ActionCard={
    image:string,
    title:string,
    paragraph:string

}
export default function ActionAreaCard({image,title,paragraph}:ActionCard) {
  return (
    <Card  className='w-full bg-gray-800 text-slate-100'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='text-4xl text-bold'> 
         {title}
          </Typography>
          <Typography variant="body2" className='text-bold'>
           {paragraph}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}