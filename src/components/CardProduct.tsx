import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import para from "../assets/para.png";
import { useState, ReactNode, useEffect } from "react";

export default function CardProduct(props: any) {
  const [nom, setNom] = useState(props);
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia sx={{ height: 120 }} image={para} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Acheter</Button>
        <Button size="small"> détails</Button>
      </CardActions>
    </Card>
  );
}
