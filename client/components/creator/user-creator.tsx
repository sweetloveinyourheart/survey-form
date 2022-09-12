import { Alert, AlertColor, Box, Button, Collapse, Container, Divider, FormGroup, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { UserInterface } from "../../types/user";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { API_URL } from "../../constants/api";

type UserState = UserInterface & {
    retypePassword: string
}

interface UserCreatorProps {

}

const UserCreator: FunctionComponent<UserCreatorProps> = () => {
    const [uploadAlert, setUploadAlert] = useState({
        active: false,
        message: '',
        severity: 'info' as AlertColor
    })

    const [user, setUser] = useState<UserState>({
        phone: '',
        password: '',
        retypePassword: '',
        birthday: new Date(),
        address: null,
        email: null,
        name: '',
        roles: [{ id: 1, name: 'user' }]
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target

        setUser(prevS => ({
            ...prevS,
            [name]: value
        }))
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const { retypePassword, ...body } = user

            if(retypePassword !== body.password) {
                setUploadAlert({
                    active: true,
                    message: "Password không khớp",
                    severity: 'error'
                })
                return;
            }

            const { data } = await axios.post(API_URL+'/user/create', body)
            
            if(data) {
                setUploadAlert({
                    active: true,
                    message: `Tạo tài khoản mới thành công: ${user.phone} - ${user.password}`,
                    severity: 'info'
                })
                setUser({
                    phone: '',
                    password: '',
                    retypePassword: '',
                    birthday: new Date(),
                    address: '',
                    email: '',
                    name: '',
                    roles: [{ id: 1, name: 'user' }]
                })
            }
        } catch (error) {
            setUploadAlert({
                active: true,
                message: "Quá trình tạo tài khoản thất bại, vui lòng kiểm tra và thử lại",
                severity: 'error'
            })
        }
    }

    return (
        <Container>
            <Paper sx={{ py: 2, px: { xs: 2, lg: 4 } }}>
                <Box display={"flex"} justifyContent="space-between" alignItems={"flex-end"}>
                    <Typography fontSize={20} fontWeight={500} textTransform="uppercase">
                        Tạo tài khoản mới
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        <form onSubmit={onSubmit}>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField
                                    label={"Số điện thoại"}
                                    value={user.phone}
                                    type="number"
                                    name="phone"
                                    fullWidth
                                    multiline
                                    required
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField
                                    label={"Mật khẩu"}
                                    value={user.password}
                                    name="password"
                                    fullWidth
                                    type={"password"}
                                    required
                                    multiline
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField
                                    label={"Nhập lại mật khẩu"}
                                    value={user.retypePassword}
                                    name="retypePassword"
                                    required
                                    fullWidth
                                    type={"password"}
                                    multiline
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField
                                    label={"Tên người dùng"}
                                    value={user.name}
                                    name="name"
                                    required
                                    fullWidth
                                    multiline
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField
                                    label={"Địa chỉ"}
                                    value={user.address}
                                    name="address"
                                    fullWidth
                                    multiline
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup sx={{ mb: 2 }}>
                                <TextField
                                    label={"Địa chỉ email"}
                                    type="email"
                                    value={user.email}
                                    name="email"
                                    fullWidth
                                    multiline
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <Collapse in={uploadAlert.active}>
                                <Alert
                                    severity={uploadAlert.severity}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setUploadAlert(s => ({ ...s, active: !s.active }));
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {uploadAlert.message}
                                </Alert>
                            </Collapse>
                            <Box display={"flex"} justifyContent="flex-end">
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    type="submit"
                                >
                                    Thêm tài khoản
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default UserCreator;