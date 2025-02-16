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
export default function ActionAreaCard({ image, title, paragraph }: ActionCard) {
  const [mainTitle, subTitle] = title.split(" - ");
    return (
      <Card
      className="w-full object-cover text-slate-100 bg-cover bg-center justify-center text-center h-auto md:h-auto lg:h-auto rounded-xl"
      style={{
        backgroundImage: `url(${typeof image === "string" ? image : image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <CardActionArea className="bg-gray-800/70 p-4 rounded-lg"> 
          <CardContent>
         
            <Typography gutterBottom variant="h5" component="div" className="text-4xl font-bold text-[#00a39a]">
              {mainTitle}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" className="text-xl font-bold">
              {subTitle}
            </Typography>
            <Typography variant="body2" className="font-bold text-[#00a39a]">
              {paragraph}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  