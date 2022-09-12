import { Box, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { API_URL } from "../../constants/api";
import { FormInterface } from "../../types/form";
import Editor from "./editor";

interface UpdateFormProps {
    id: number | undefined
    updateMode?: BooleanConstructor
}

const UpdateForm: FunctionComponent<UpdateFormProps> = ({ id }) => {
    const [formData, setFormData] = useState<FormInterface | undefined>()

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const { data } = await axios.get(API_URL + '/form/getById/' + id)
                    
                    if(data) {
                        setFormData(data)
                    }
                } catch (error) {
                    setFormData(undefined)
                }
            })()
        }
    }, [id])

    if (!formData) {
        return (
            <Container>
                <Paper sx={{ py: 4, px: { xs: 3, lg: 8 } }}>
                    <Box
                        display={"flex"}
                        justifyContent="center"
                        alignItems={"center"}
                        flexDirection={"column"}
                        height={250}
                    >
                        <Typography>Chưa có biểu mẫu nào được chọn</Typography>
                    </Box>
                </Paper>
            </Container>
        )
    }

    return <Editor updateData={formData} updateMode={true} />
}

export default UpdateForm;