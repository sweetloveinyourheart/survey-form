import { FunctionComponent } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useUser } from "../header/header";
import { useAuth } from "../../hooks/auth.hook";

interface UserIdentifyProps {
    onSubmitContest: () => void
}

const UserIdentify: FunctionComponent<UserIdentifyProps> = ({ onSubmitContest }) => {

    const { accessToken } = useAuth()
    const { user } = useUser(accessToken)

    return (
        <Paper
            sx={{ py: 1, px: { xs: 3, lg: 4 } }}
        >
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                        <Box display="flex" alignItems={"center"}>
                            <Avatar alt="Remy Sharp" sx={{ border: '2px solid #fff' }} src="/icons/man.png" />
                            <Box ml={1}>
                                <Typography color="#777" fontSize={14}>Họ và tên: {user?.name}</Typography>
                                <Typography color="#777" fontSize={14}>Số điện thoại: {user?.phone}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box  
                            height="100%" 
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', lg: 'flex-end' } }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => onSubmitContest()}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default UserIdentify;