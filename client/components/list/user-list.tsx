import { Box, Button, Container, Divider, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import { UserInterface } from '../../types/user'
import Moment from "react-moment";
import { API_URL } from "../../constants/api";
import { useAuth } from "../../hooks/auth.hook";
import useSWR from "swr";
import { fetcher } from "../../utils/swr";

interface UserListProps {}

const ITEMS_PER_PAGE = 10

const UserList: FunctionComponent<UserListProps> = () => {
    const [users, setUsers] = useState<UserInterface[]>([])
    const [paging, setPaging] = useState<{ count: number, cursor: number }>({
        count: 10,
        cursor: 0
    })

    const { accessToken } = useAuth()
    const { data, error } = useSWR<{ users: UserInterface[], count: number }>(accessToken ? [API_URL + `/user/getAll?cursor=${paging.cursor}`] : null, fetcher)

    useEffect(() => {
        if (data && !error) {
            setUsers(data.users)
            setPaging(prevS => ({
                ...prevS,
                count: data.count > 10 ? data.count : 10
            }))
        }
    }, [data, error])

    const onPageClick = (page: number) => {
        setPaging(prevS => ({
            ...prevS,
            cursor: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
        }))
    }

    return (
        <Container>
            <Paper sx={{ py: 2, px: { xs: 2, lg: 4 } }}>
                <Box display={"flex"} justifyContent="space-between" alignItems={"flex-end"}>
                    <Typography fontSize={20} fontWeight={500} textTransform="uppercase">
                        Danh sách tài khoản
                    </Typography>
                    <Button variant="outlined" startIcon={<ReplayIcon />}>
                        Refresh
                    </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell align="right">Số điện thoại</TableCell>
                            <TableCell align="right">Địa chỉ</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Ngày sinh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                {row.birthday && <TableCell align="right"><Moment format="DD/MM/yyyy">{row.birthday || undefined}</Moment></TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box display={"flex"} justifyContent="center" mt={4}>
                    <Pagination 
                        count={paging.count/ITEMS_PER_PAGE} 
                        color="primary" 
                        onChange={(e, page) => onPageClick(page)}
                    />
                </Box>
            </Paper>
        </Container>
    );
}

export default UserList;