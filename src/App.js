
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const links = [
    { label: 'Blog', url: '/blog' },
];

const backgrounds = [
    {
        style: {
            background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
        }
    },
    {
        style: {
            background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            position: 'relative'
        },
        shapes: [
            {
                type: 'circle',
                animation: 'floating 5s infinite'
            },
            {
                type: 'triangle',
                animation: 'rotate 5s infinite'
            }
        ]
    },
    // ... add more backgrounds with different styles and shapes
];

const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

const StyledBox = styled(Box)(({ theme }) => ({
    height: '100%',
    margin: 0,
    padding: theme.spacing(5),
    ...randomBackground.style
}));

const App = () => {
    return (
        <StyledBox>
            <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                marginBottom={3} // Add some space before the Outlet
            >
                <Typography variant="h4" gutterBottom>
                    Adnan Dossaji
                </Typography>
                <ButtonGroup
                    orientation="horizontal"
                    aria-label="horizontal outlined button group"
                >
                    {links.map(link => (
                        link.url.startsWith('/') ? (
                            <Button key={link.label} component={Link} to={link.url}>
                                {link.label}
                            </Button>
                        ) : (
                            <Button key={link.label} href={link.url}>
                                {link.label}
                            </Button>
                        )
                    ))}
                </ButtonGroup>
            </Box>
            <Box>
                <Outlet />
            </Box>
        </StyledBox>
    );
};

export default App;
