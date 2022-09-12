import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

import ReplayIcon from '@mui/icons-material/Replay';
import useSWR from "swr";
import { useAuth } from "../../hooks/auth.hook";
import { fetcher } from "../../utils/swr";
import { API_URL } from "../../constants/api";
import { FormInterface } from "../../types/form";
import FormItem from "../items/form-item";
import EmptyDisplayer from "../empty/empty-displayer";

interface ExamListProps {
    selectedFormId?: number
    onSelectForm: (id: number | undefined) => void
}

const ExamList: FunctionComponent<ExamListProps> = ({ onSelectForm, selectedFormId }) => {

    const { accessToken } = useAuth()
    const { data, error } = useSWR<FormInterface[]>(accessToken ? [API_URL + '/form/getAll', accessToken] : null, fetcher)

    const renderList = () => {
        let jsx: JSX.Element[] = [];
        if (data && !error) {
            jsx = data.map((form, index) => {
                return (
                    <Grid item xs={12} lg={6} key={index}>
                        <FormItem 
                            form={form} 
                            editMode 
                            onSelectForm={onSelectForm}
                            selectedFormId={selectedFormId}
                        />
                    </Grid>
                )
            })
        }
        return jsx
    }

    return (
        <Container>
            <Paper sx={{ py: 2, px: { xs: 2, lg: 4 } }}>
                <Box display={"flex"} justifyContent="space-between" alignItems={"flex-end"}>
                    <Typography fontSize={20} fontWeight={500} textTransform="uppercase">
                        Danh sách bài thi
                    </Typography>
                    <Button variant="outlined" startIcon={<ReplayIcon />}>
                        Refresh
                    </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                    {(data && !error)
                        ? renderList()
                        : <Grid xs={12} lg={12} item><EmptyDisplayer text="Chưa có bài thi nào !" /></Grid>
                    }
                </Grid>
            </Paper>
        </Container>
    );
}

export default ExamList;