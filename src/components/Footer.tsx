import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              A propos de nous
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Une societe de vente des produits pharmaceutiques qui propose
              diférents produits avec pas mal de catégories
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contactez nous
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Villetaneuse, paris, France
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: contact@loki.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              suivez nous
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}