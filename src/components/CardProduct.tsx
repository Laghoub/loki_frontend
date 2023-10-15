import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import para from "../assets/para.png";
import { useState, ReactNode, useEffect } from "react";
import config from '../config.json'
import pharma1 from "../assets/No_image_available.png";


export default function CardProduct(props: any) {
  const SERVER_URL = config.SERVER_URL;

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia sx={{ height: 120 }} image={pharma1} title={props.nom} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.nom}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" disabled>Buy</Button>
        <Button  href={`./Details/${props.id}`} style={{color:'#1976d2'}} size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
