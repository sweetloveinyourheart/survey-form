import { Alert, AlertColor, Box, Button, Checkbox, Collapse, Container, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, List, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, FunctionComponent, useState, useTransition } from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from "swr";
import { useAuth } from "../../hooks/auth.hook";
import { API_URL } from "../../constants/api";
import { UserInterface } from "../../types/user";
import { fetcher } from "../../utils/swr";
import { FormInterface } from "../../types/form";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';


interface ContestCreatorProps {

}

const ContestCreator: FunctionComponent<ContestCreatorProps> = () => {
    const [search, setSearch] = useState<string>('')
    const [searchResult, setSearchResult] = useState<UserInterface[]>([])
    const [contest, setContest] = useState<{ form: { id: number | undefined }, users: { id: number | undefined }[] }>({
        form: {
            id: 0
        },
        users: []
    })
    const [formInformation, setFormInformation] = useState<FormInterface | undefined>()
    const [uploadAlert, setUploadAlert] = useState({
        active: false,
        message: '',
        severity: 'info' as AlertColor
    })

    const [isLoading, startTransition] = useTransition()
    const { accessToken } = useAuth()
    const { data: userData } = useSWR<{ users: UserInterface[], count: number }>(accessToken ? [API_URL + `/user/getAll`] : null, fetcher)
    const { data: formData } = useSWR<FormInterface[]>(accessToken ? [API_URL + '/form/getAll', accessToken] : null, fetcher)


    // ultils
    const checkUserExist = (id: number | undefined) => {
        if (contest.users.some(val => val.id === id))
            return true

        return false
    }

    const canSubmit = () => {
        if (contest.form.id && contest.users.length > 0)
            return true

        return false
    }

    // handler

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setSearch(value)

        startTransition(() => {
            if (value.length === 0) {
                setSearchResult([])
                return;
            }

            (async () => {
                try {
                    const { data } = await axios.get(API_URL + '/user/find?name=' + value)
                    if (data) {
                        setSearchResult(data)
                    }
                } catch (error) {
                    setSearchResult([])
                }
            })()
        })

    }

    const onSelectUsers = (userId: number | undefined) => {
        if (!userId) return;

        let newList = [...contest.users]
        const isExist = newList.findIndex(user => user.id === userId)
        if (isExist > -1) {
            newList.splice(isExist, 1)
            setContest(prevState => ({
                ...prevState,
                users: newList
            }))
        } else {
            newList.push({ id: userId })
            setContest(prevState => ({
                ...prevState,
                users: newList
            }))
        }
    }

    const onSelectForm = (e: any) => {
        setContest(prevS => ({ ...prevS, form: { id: Number(e.target.value) } }))
        if (formData) {
            const formInfo = formData.find(val => val.id === e.target.value)
            setFormInformation(formInfo)
        }
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const { data } = await axios.post(API_URL + '/contest/create', contest)

            if (data) {
                setContest({
                    form: {
                        id: 0
                    },
                    users: []
                })
                setFormInformation(undefined)
                setUploadAlert({
                    active: true,
                    message: "Đã tạo thành công bảng câu hỏi",
                    severity: 'info'
                })
            }
        } catch (error) {
            setUploadAlert({
                active: true,
                message: "Password không khớp",
                severity: 'error'
            })
        }
    }

    // JSX renderer

    const renderForm = () => {
        let result: JSX.Element[] = [];
        if (formData) {
            result = formData.map((form, index) => {
                return <MenuItem value={form.id} key={index}>{form.title}</MenuItem>
            })
        }
        return result
    }

    const renderUsers = () => {
        let result: JSX.Element[] = [];
        if (userData) {
            result = userData.users.map((user, index) => {
                return (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={checkUserExist(user.id)}
                                onChange={() => onSelectUsers(user.id)}
                            />
                        }
                        label={user.name}
                    />
                )
            })
        }
        return result
    }

    const renderSearch = () => {
        let result: JSX.Element[] = [];
        if (searchResult) {
            result = searchResult.map((user, index) => {
                return (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={checkUserExist(user.id)}
                                onChange={() => onSelectUsers(user.id)}
                            />
                        }
                        label={user.name}
                    />
                )
            })
        }
        return result
    }

    return (
        <Container>
            <Paper sx={{ py: 2, px: { xs: 2, lg: 4 } }}>
                <Box display={"flex"} justifyContent="space-between" alignItems={"flex-end"}>
                    <Typography fontSize={20} fontWeight={500} textTransform="uppercase">
                        Phân phát biểu mẫu
                    </Typography>
                    <Button variant="outlined" startIcon={<ReplayIcon />}>
                        Refresh
                    </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12} lg={6} item>
                            <Stack direction={"column"} spacing={2}>
                                <FormControl color="secondary" fullWidth>
                                    <FormLabel id="q3" sx={{ mb: 1 }}>
                                        <Typography> Chọn biểu mẫu </Typography>
                                    </FormLabel>
                                    <Select
                                        sx={{ width: '100%' }}
                                        value={contest.form.id}
                                        onChange={(e) => onSelectForm(e)}
                                        placeholder="Chọn biểu mẫu ..."
                                    >
                                        <MenuItem disabled value={0}>Chọn biểu mẫu ...</MenuItem>
                                        {renderForm()}
                                    </Select>
                                </FormControl>
                                <FormControl color="secondary" fullWidth>
                                    <FormLabel id="q3" sx={{ mb: 1 }}>
                                        <Typography> Chọn người tham gia </Typography>
                                    </FormLabel>
                                    <TextField
                                        size="small"
                                        sx={{ mb: 2 }}
                                        placeholder="Nhập tên người dùng ..."
                                        value={search}
                                        onChange={onSearchChange}
                                        InputProps={{
                                            endAdornment: <SearchIcon sx={{ color: "#dcdcdc" }} />
                                        }}
                                    />
                                    <List
                                        sx={{
                                            maxHeight: '500px',
                                            minHeight: '300px',
                                            overflow: 'auto',
                                            border: '1px solid #eee',
                                            px: 2
                                        }}
                                    >
                                        <FormGroup>
                                            {search ? renderSearch() : renderUsers()}
                                        </FormGroup>
                                    </List>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid xs={12} lg={6} item>
                            <Box sx={{ borderLeft: '1px solid #dcdcdc', height: '100%', px: 2 }}> 
                                <Typography fontWeight={'600'}>Thông tin biểu mẫu</Typography>
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
                                        sx={{ my: 1 }}
                                    >
                                        {uploadAlert.message}
                                    </Alert>
                                </Collapse>
                                <Box my={2}>
                                    <Typography fontSize={14} mb={1}>Tiêu đề: {formInformation?.title || '____'}</Typography>
                                    <Typography fontSize={14} mb={1}>Người tạo biểu mẫu:  {formInformation?.author || '____'}</Typography>
                                    <Typography fontSize={14} mb={1}>Số câu hỏi:  {formInformation?.questionCount || '____'}</Typography>
                                    <Typography fontSize={14} mb={1}>Số người tham gia trả lời: {contest.users.length}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} lg={6} item>
                            <Box display={"flex"} justifyContent="flex-end">
                                <Button disabled={!canSubmit()} type="submit" variant="contained">Tạo danh sách biểu mẫu</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default ContestCreator;