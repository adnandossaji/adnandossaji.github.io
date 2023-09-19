import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { mockData } from './data';

const Blog = () => {
  const sortedPosts = Object.values(mockData).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // For descending order
  });

  return (
    <Container style={{ marginTop: '2em' }}>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {sortedPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card elevation={3}>
              <CardActionArea component={Link} to={`/blog/${post.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.imageUrl}
                  alt={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body1">
                    {post.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
