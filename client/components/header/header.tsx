import { AppBar, Avatar, Box, Button, Container, Fab, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, MouseEvent, useState } from "react";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_URL } from "../../constants/api";
import { fetcher } from "../../utils/swr";
import { useAuth } from "../../hooks/auth.hook";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserInterface } from "../../types/user";

interface HeaderProps { }

const pages = ['Trang Chủ'];
const settings = [
    {
        label: 'Danh sách',
        value: 'main'
    },
    {
        label: 'Thiết kế',
        value: 'design'
    },
    {
        label: 'Đăng xuất',
        value: 'logout'
    }
];

export function useUser(accessToken: string | undefined) {
    const { data, error } = useSWR<UserInterface>(accessToken ? [API_URL + '/user/profile', accessToken] : null, fetcher)

    return {
        user: data,
        isLoading: (!error && !data && accessToken !== undefined),
        isError: error
    }
}

const Header: FunctionComponent<HeaderProps> = () => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const router = useRouter()
    const { accessToken, logout } = useAuth()
    const { user, isLoading } = useUser(accessToken)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (page: string) => {
        setAnchorElUser(null);
        router.push(`/${page}`)
    };

    return (
        <AppBar
            position="fixed"
            sx={{ backgroundColor: "#FC4F4F" }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/#"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/#"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', mx: 2, fontSize: 15 }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {(user)
                        ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" sx={{ border: '2px solid #fff' }} src="/icons/man.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting, index) => (
                                        setting.value === "logout"
                                            ? (
                                                <MenuItem
                                                    sx={{ width: 250 }}
                                                    key={index}
                                                    onClick={() => logout()}
                                                >
                                                    <Typography textAlign="center">{setting.label}</Typography>
                                                </MenuItem>
                                            )
                                            : (
                                                <MenuItem
                                                    sx={{ width: 250 }}
                                                    key={index}
                                                    onClick={() => handleCloseUserMenu(setting.value)}
                                                >
                                                    <Typography textAlign="center">{setting.label}</Typography>
                                                </MenuItem>
                                            )
                                    ))}
                                </Menu>
                            </Box>
                        )
                        : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button
                                    disabled={isLoading}
                                    variant="contained"
                                    startIcon={<AccountCircleIcon />}
                                    onClick={() => router.push('/login')}
                                >
                                    Đăng nhập
                                </Button>
                            </Box>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;