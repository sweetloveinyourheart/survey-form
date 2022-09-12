import { Avatar, Box, Button, Checkbox, Divider, FormControl, Grid, IconButton, MenuItem, Paper, Radio, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { AnswerInterface, AnswerType, QuestionInterface, SelectionInterface } from "../../types/form";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import CollectionsIcon from '@mui/icons-material/Collections';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from "next/image";

interface EditorQuestionProps {
    questionIndex: number,
    question: QuestionInterface,
    onSubmitQuestion: (questionIndex: number, question: QuestionInterface) => void
    onRemoveQuestion: (questionIndex: number) => void
}

interface MultipeChooseAnswerProps {
    selections: SelectionInterface[],
    onChange: (answer: SelectionInterface[]) => void
    answerType: AnswerType
}

const MultipeChooseAnswer = ({ selections, onChange, answerType }: MultipeChooseAnswerProps) => {

    const onAnswerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        let dummy = [...selections]
        dummy[index].text = e.target.value
        onChange(dummy)
    }

    const onAddAnswer = () => {
        onChange([...selections, { text: '' }])
    }

    const renderAnswer = () => {
        switch (answerType) {
            case AnswerType.Radio:
                return selections.map((value, index) => {
                    return (
                        <Box key={`multi-answer-${index}`}>
                            <Radio disabled />
                            <TextField
                                label="Tuỳ chọn"
                                size="small"
                                value={value.text}
                                onChange={e => onAnswerChange(e, index)}
                            />
                        </Box>
                    )
                })

            case AnswerType.Checkbox:
                return selections.map((value, index) => {
                    return (
                        <Box key={`multi-answer-${index}`}>
                            <Checkbox disabled />
                            <TextField
                                label="Tuỳ chọn"
                                size="small"
                                value={value.text}
                                onChange={e => onAnswerChange(e, index)}
                            />
                        </Box>
                    )
                })

            case AnswerType.Select:
                return selections.map((value, index) => {
                    return (
                        <Box display={"flex"} alignItems="center" key={`multi-answer-${index}`}>
                            <Avatar sx={{ width: 24, height: 24, mx: 1 }}>{index + 1}</Avatar>
                            <TextField
                                label="Tuỳ chọn"
                                size="small"
                                value={value.text}
                                onChange={e => onAnswerChange(e, index)}
                            />
                        </Box>
                    )
                })

            default:
                return;
        }
    }

    return (
        <Box>
            <Stack spacing={1}>
                {renderAnswer()}
            </Stack>
            <Box mt={2}>
                <Button onClick={() => onAddAnswer()}>Thêm tuỳ chọn</Button>
            </Box>
        </Box>
    )
}

const EditorQuestion: FunctionComponent<EditorQuestionProps> = ({ question, questionIndex, onSubmitQuestion, onRemoveQuestion }) => {
    const [questionState, setQuestionState] = useState<QuestionInterface>(question)
    const [isContentChange, setIsContentChange] = useState<boolean>(false)
    const [images, setImages] = useState<ImageListType>([]);

    useEffect(() => {
        setQuestionState(question)
    }, [question])

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target
        setIsContentChange(true)
        setQuestionState(s => ({
            ...s,
            [name]: value
        }))

        // onQuestionChange(questionIndex, { ...question, [name]: value })
    }

    const onImageChange = (value: ImageListType) => {
        setImages(value)
        onSubmitQuestion(questionIndex, {
            ...question,
            image: ''
        })
    };

    const onImageRemoveAll = () => {
        setImages([])
        onSubmitQuestion(questionIndex, {
            ...question,
            image: null
        })
    }

    const onSelectAnswerType = (event: SelectChangeEvent<AnswerType>) => {
        const value: AnswerType = event.target.value as AnswerType

        let answer: AnswerInterface = {
            text: '',
            selections: null
        }
        if (value !== AnswerType.Text && value !== AnswerType.MultipleText) {
            answer = {
                text: null,
                selections: []
            }
        }

        setQuestionState(s => ({
            ...s,
            answerType: value,
            answer
        }))
    }

    const onMultipleAnswerChange = useCallback((answer: SelectionInterface[]) => {
        setQuestionState(s => ({
            ...s,
            answer: {
                text: null,
                selections: answer
            }
        }))
    }, [question])

    const onSaveQuestion = () => {
        setIsContentChange(false)
        onSubmitQuestion(questionIndex, questionState)
    }

    const renderAnswer = () => {
        switch (questionState.answerType) {
            case AnswerType.Text:
                return <TextField disabled value="Trả lời ngắn" fullWidth />

            case AnswerType.MultipleText:
                return <TextField disabled multiline minRows={5} value="Đoạn" fullWidth />

            default:
                return <MultipeChooseAnswer selections={questionState.answer?.selections || []} onChange={onMultipleAnswerChange} answerType={questionState.answerType} />
        }
    }

    return (
        <FormControl>
            <Paper sx={{ p: 2, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            label={"Câu hỏi"}
                            value={questionState.question}
                            name="question"
                            fullWidth
                            multiline
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={4} lg={2}>
                        <Box display={"flex"} height={"100%"} justifyContent="center" alignItems={"center"}>
                            <ImageUploading
                                value={images}
                                onChange={onImageChange}
                                maxNumber={1}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload
                                }) => (
                                    <>
                                        {imageList.length === 0
                                            ? (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<CollectionsIcon />}
                                                    onClick={onImageUpload}
                                                >
                                                    Ảnh
                                                </Button>
                                            )
                                            : (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<CollectionsIcon />}
                                                    onClick={() => onImageRemoveAll()}
                                                >
                                                    Xoá ảnh
                                                </Button>
                                            )
                                        }
                                    </>
                                )}
                            </ImageUploading>
                        </Box>
                    </Grid>
                    <Grid item xs={8} lg={4}>
                        <Select
                            fullWidth
                            value={questionState.answerType}
                            onChange={(e) => onSelectAnswerType(e)}
                        >
                            <MenuItem value={AnswerType.Text}>Trả lời ngắn</MenuItem>
                            <MenuItem value={AnswerType.MultipleText}>Đoạn</MenuItem>
                            <MenuItem value={AnswerType.Radio}>Trắc nghiệm</MenuItem>
                            <MenuItem value={AnswerType.Checkbox}>Hộp kiểm</MenuItem>
                            <MenuItem value={AnswerType.Select}>Menu thả xuống</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                {images.length === 1
                    && (
                        <Box
                            height={300}
                            position="relative"
                            sx={{ my: 2 }}
                        >
                            <Image
                                layout="fill"
                                objectFit="contain"
                                src={images[0]['data_url']}
                                alt="#"
                            />
                        </Box>
                    )
                }
                <Divider sx={{ my: 2 }} />
                {renderAnswer()}
                <Divider sx={{ my: 2 }} />
                <Stack direction={"row"} justifyContent="flex-end">
                    <IconButton aria-label="delete" onClick={() => onRemoveQuestion(questionIndex)}>
                        <DeleteIcon />
                    </IconButton>
                    <Button 
                        variant="outlined" 
                        disabled={!isContentChange}
                        onClick={() => onSaveQuestion()}
                    >
                        Xác nhận
                    </Button>
                </Stack>
            </Paper>
        </FormControl>
    );
}

export default EditorQuestion;