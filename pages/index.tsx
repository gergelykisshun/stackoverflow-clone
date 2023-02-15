import { Button, Typography } from "@mui/material";
export default function Home() {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Welcome to{" "}
        <Typography variant="h2" color="primary" component="span">
          Flash
        </Typography>{" "}
        Answers
      </Typography>
      <Button variant="contained"> Start searching </Button>
    </>
  );
}
