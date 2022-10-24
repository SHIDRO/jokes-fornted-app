import { Card, Typography, Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const JokesItem = ({ title, content, likes }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography
          sx={{ borderBottom: "1px solid  #d9d9d9" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ padding: "auto" }}
          endIcon={<ThumbUpIcon sx={{ paddingBottom: "2px" }} />}
          variant="outlined"
          size="small"
        >
          {likes}
        </Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
};

export default JokesItem;
