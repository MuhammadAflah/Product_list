import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Mail from "@mui/icons-material/Mail";
import Notification from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputBase } from '@mui/material';


const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});



const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "2rem",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        display: "flex"
    }
}));

const MobileIcons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        display: "none"
    }
}));



const Navbar = () => {

    const [search, setSearch] = useState("")


    return (
        <AppBar sx={{ backgroundColor: "rgba(39, 11, 96, 0.7)" }} position='sticky' >
            <StyledToolbar>
                <Typography variant='h3' sx={{ display: { xs: "none", md: "block" } }}>
                    Shoppee
                </Typography>

                
                <Icons>
                    <Badge badgeContent={4} color="error">
                        <Mail color="white" />
                    </Badge>
                    <Badge badgeContent={4} color="error">
                        <Notification color="white" />
                    </Badge>
                    <Avatar sx={{ width: 30, height: 30 }} />
                </Icons>
                <MobileIcons>
                    <Link to="/chats" style={{ color: 'white' }}>
                        <Badge badgeContent={4} color="error">
                            <Mail color="white" />
                        </Badge>
                    </Link>
                    <Link to="/notificatios" style={{ color: 'white' }}>
                        <Badge badgeContent={4} color="error">
                            <Notification color="white" />
                        </Badge>
                    </Link>
                    <Avatar sx={{ width: 30, height: 30 }} />
                </MobileIcons>
            </StyledToolbar>

        </AppBar>
    );
};

export default Navbar;
