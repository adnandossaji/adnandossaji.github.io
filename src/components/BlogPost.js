import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CardMedia, CardContent, Avatar, Box, Divider } from '@mui/material';
import { mockData } from './data';
import ErrorPage from './shared/ErrorPage';

const BlogPost = () => {
    const { postId } = useParams();
    const post = mockData[postId];

    if (!post) {
        return (
            <ErrorPage />
        );
    }

    return (
        <Container style={{ marginTop: '2em' }}>
            <CardMedia
                component="img"
                height="400"
                image={post.imageUrl}
                alt={post.title}
            />
            <Typography variant="h4" gutterBottom style={{ marginTop: '1em' }}>
                {post.title}
            </Typography>
            <Box display="flex" alignItems="center" marginBottom="1em">
                <Avatar style={{ marginRight: '10px' }}>{post.author[0]}</Avatar>
                <Box>
                    <Typography variant="subtitle1">{post.author}</Typography>
                    <Typography variant="caption" color="textSecondary">
                        {post.date} • {post.readingTime}
                    </Typography>
                </Box>
            </Box>
            <Divider style={{ marginBottom: '1em' }} />
            <Typography variant="body1" paragraph>
                {post.excerpt}
            </Typography>
            <Typography variant="body1">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Typography>
        </Container>
    );
};

export default BlogPost;
