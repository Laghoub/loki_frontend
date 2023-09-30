import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import para from "../assets/para.png";

export default function CardProduct() {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia sx={{ height: 120 }} image={para} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Paracétamol
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Le paracétamol, dont la dénomination commune internationale (DCI) est
          l'acétaminophène,
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Button size="small"> Details</Button>
      </CardActions>
    </Card>
  );
}
