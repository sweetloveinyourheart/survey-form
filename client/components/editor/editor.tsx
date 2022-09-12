import { Alert, Box, Button, Collapse, Container, Divider, FormControl, Paper, Stack, TextField, AlertColor, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { AnswerType, FormInterface, QuestionInterface } from "../../types/form";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditorQuestion from "./question.editor";
import axios from "axios";
import { API_URL } from "../../constants/api";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface EditorProps {
    updateMode?: boolean
    updateData?: FormInterface
}

const Editor: FunctionComponent<EditorProps> = ({ updateMode, updateData }) => {
    const [uploadAlert, setUploadAlert] = useState({
        active: false,
        message: '',
        severity: 'info' as AlertColor
    })

    const [form, setForm] = useState<FormInterface>({
        title: "",
        author: "",
        questions: []
    })

    useEffect(() => {
        if (updateData && updateMode) {
            setForm(updateData)
        }
    }, [updateData])

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onAddNewQuestion = () => {
        const newQuestion: QuestionInterface = {
            question: 'Nhập câu hỏi ?',
            answerType: AnswerType.Text,
            image: null,
            answer: {
                text: '',
                selections: null
            }
        }
        setForm(prevState => ({
            ...prevState,
            questions: [...prevState.questions, newQuestion]
        }))
    }

    const onSubmitQuestion = useCallback((questionIndex: number, question: QuestionInterface) => {
        let items = [...form.questions]
        items[questionIndex] = question
        setForm(prevState => ({
            ...prevState,
            questions: items
        }))
    }, [form])

    const onRemoveQuestion = useCallback((questionIndex: number) => {
        let items = [...form.questions]
        items.splice(questionIndex, 1)
        setForm(prevState => ({
            ...prevState,
            questions: items
        }))
    }, [form])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            let res: any

            if (updateMode) {
                res = await axios.put(API_URL + '/form/update', form)
            } else {
                res = await axios.post(API_URL + '/form/create', form)
            }

            if (res.data) {
                setUploadAlert({
                    active: true,
                    message: 'Đăng tải thành công, bảng câu hỏi sẽ được hiển thị trong danh sách',
                    severity: 'info'
                })
                setForm({
                    title: "",
                    author: "",
                    questions: []
                })
            }

        } catch (error) {
            setUploadAlert({
                active: true,
                message: 'Đăng tải không thành công, vui lòng thử lại',
                severity: 'error'
            })
        }
    }

    const renderQuestion = () => {
        return form.questions.map((question, index) => {
            return (
                <EditorQuestion
                    question={question}
                    questionIndex={index}
                    key={index}
                    onSubmitQuestion={onSubmitQuestion}
                    onRemoveQuestion={onRemoveQuestion}
                />
            )
        })
    }

    return (
        <Container>
            <Paper sx={{ py: 4, px: { xs: 3, lg: 8 } }}>
                <form onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <FormControl >
                            <TextField
                                label="Tiêu đề bài thi"
                                fullWidth
                                value={form.title}
                                name="title"
                                required
                                onChange={(e) => onChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label="Đơn vị tổ chức"
                                required
                                name="author"
                                fullWidth
                                value={form.author}
                                onChange={(e) => onChange(e)}
                            />
                        </FormControl>
                    </Stack>
                    <Divider sx={{ my: 2, width: "20%", mx: 'auto' }} />
                    <Stack spacing={2} mb={2}>
                        {renderQuestion()}
                    </Stack>
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
                    <Box display={"flex"} justifyContent="space-between">
                        <Button
                            startIcon={<AddIcon />}
                            variant="outlined"
                            onClick={() => onAddNewQuestion()}
                        >
                            Thêm câu hỏi
                        </Button>
                        <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type="submit"
                        >
                            {updateMode
                                ? "Lưu thay đổi"
                                : "Lưu đề thi"
                            }
                        </Button>
                    </Box>

                </form>
            </Paper>
        </Container>
    );
}

export default Editor;