import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/auth.hook";
import { useRouter } from "next/router";

interface LoginComponentProps { }

const LoginComponent: FunctionComponent<LoginComponentProps> = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //Hooks
    const router = useRouter()
    const { accessToken, authError, login } = useAuth()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // login
        login(username, password)
    }

    useEffect(() => {
        if(accessToken && !authError) {
            router.push('/main')
        }
    }, [accessToken, authError])

    return (
        <Paper sx={{ maxWidth: { xs: 350, sm: 500 }, p: 6, borderRadius: 2 }}>
            <Typography
                fontSize={24}
                fontWeight={600}
                textAlign="center"
                textTransform={"uppercase"}
                color="#f93707"
                mb={1}
            >
                Login to Mini Exam
            </Typography>
            <Typography
                textAlign={"center"}
                color="#777"
            >
                Login to take your exam
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={onSubmit}>
                <TextField
                    required
                    label="Phone"
                    fullWidth
                    margin="normal"
                    size="medium"
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    required
                    label="Password"
                    type={"password"}
                    fullWidth
                    size="medium"
                    margin="normal"
                    onChange={e => setPassword(e.target.value)}
                />
                <Divider sx={{ my: 2 }} />
                {authError && <Typography color="red" my={1}>{authError}</Typography>}
                <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ my: 2, py: 1, fontSize: 16 }}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </Paper>
    );
}

export default LoginComponent;