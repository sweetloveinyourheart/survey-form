import { Alert, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { FormInterface } from "../../types/form";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { useRouter } from "next/router";

interface FormItemProps {
    form: FormInterface
    contestCode?: string
    editMode?: boolean
    selectedFormId?: number
    onSelectForm?: (id: number | undefined) => void
}

const FormItem: FunctionComponent<FormItemProps> = ({ editMode, form, onSelectForm, selectedFormId, contestCode }) => {
    const [isRemoved, setIsRemoved] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (selectedFormId === form.id) {
            setIsEditing(true)
        } else {
            setIsEditing(false)
        }
    }, [selectedFormId])

    // handler
    const onStartContest = () => {
        if(!contestCode) 
            return;

        router.push(`/contest/${contestCode}`)
    }

    const onEditForm = () => {
        if (onSelectForm) {
            setIsEditing(true)
            onSelectForm(form.id)
        }
    }

    const onRemoveForm = async () => {
        try {
            const { data } = await axios.delete(API_URL + '/delete/' + form.id)

            if (data)
                setIsRemoved(true)
        } catch (error) {
            setIsRemoved(false)
        }
    }

    const onUnselect = () => {
        if (onSelectForm) {
            setIsEditing(false)
            onSelectForm(undefined)
        }
    }

    if (isEditing)
        return (
            <Box
                height="100%"
                minHeight={125}
                border="1px solid #dcdcdc"
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
                flexDirection="column"
                borderRadius={2}
            >
                <Alert
                    severity="info"
                >
                    "Biểu mẫu đang được chỉnh sửa"
                </Alert>
                <Button sx={{ mt: 1 }} variant="outlined" onClick={() => onUnselect()}>Bỏ chọn</Button>
            </Box>
        )

    if (isRemoved) {
        return (
            <Box
                height="100%"
                minHeight={125}
                border="1px solid #dcdcdc"
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
                borderRadius={2}
            >
                <Alert
                    severity="success"
                >
                    "Đã xoá biểu mẫu thành công !"
                </Alert>
            </Box>
        )
    }

    return (
        <Paper sx={{ width: '100%', padding: 2, backgroundColor: "#FEF9A7" }}>
            <Grid container>
                <Grid xs={12} md={6} item>
                    <Box height={"100%"} display={"flex"} flexDirection="column" justifyContent={"space-between"}>
                        <Box >
                            <Typography fontWeight={600} fontSize={18} mb={0.5} textTransform="uppercase">
                                {form.title}
                            </Typography>
                            <Typography color="#777" fontSize={14} mb={0.5}>
                                {form.author}
                            </Typography>
                        </Box>
                        <Box display={"flex"} alignItems="center">
                            <AccessAlarmsIcon sx={{ fontSize: 18, color: "#777", mr: 0.5 }} />
                            <Typography color="#777" fontSize={14}>
                                Số câu hỏi: {form.questionCount || '___'}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} md={6} item>
                    <Box display={"flex"} flexDirection="column" alignItems="flex-end">
                        {!editMode
                            && (
                                <Button variant="contained" color="info" sx={{ mb: 1 }} onClick={() => onStartContest()}>
                                    Bắt đầu
                                </Button>
                            )
                        }
                        {editMode
                            && (
                                <Button variant="contained" color="secondary" sx={{ mb: 1 }} onClick={() => onEditForm()}>
                                    Chỉnh sửa
                                </Button>
                            )
                        }
                        {editMode
                            && (
                                <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => onRemoveForm()}>
                                    Gỡ bỏ
                                </Button>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default FormItem;