import { FunctionComponent, useCallback, useEffect, useState } from "react";
import {
    Box,
    Container,
    Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import Image from "next/image";
import { AnswerType, FormInterface } from "../../types/form";
import { RecordInterface } from "../../types/record";
import UserIdentify from "../identification/user-identify";
import { CheckboxQuestion, MultiLineQuestion, RadioQuestion, SelectionQuestion, TextQuestion } from "./questions.paper";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { ContestInterface } from "../../types/contest";

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

type RecordState = RecursivePartial<RecordInterface>

interface ContestPaperProps {
    form: FormInterface
    contest?: ContestInterface
}

const ContestPaper: FunctionComponent<ContestPaperProps> = ({ form, contest }) => {
    const [formState, setFormState] = useState<FormInterface | undefined>()
    const [record, setRecord] = useState<RecordState>({
        contest: {
            id: 0
        },
        items: []
    })

    useEffect(() => {
        const initRecordItem = form.questions.map((item) => {
            return {
                text: item.answerType === AnswerType.Select ? null : '',
                selections: item.answerType === AnswerType.Select ? [] : null
            }
        })

        setFormState(form)
        setRecord({
            contest: { id: contest?.id },
            items: initRecordItem
        })
    }, [form])

    // Handler

    const onAnswerChange = useCallback((value: string, index: number) => {
        let items = record.items ? [...record.items] : []
        items[index] = { text: value, selections: null }
        setRecord(prevS => ({
            ...prevS,
            items
        }))
    }, [record])

    const onMultipleAnswerChange = useCallback((value: string, index: number) => {
        let items = record.items ? [...record.items] : []
        let selections = items[index]?.selections

        if (!selections) {
            selections = []
        }

        const indexOf = selections.findIndex(v => v?.text === value)
        if (indexOf > -1) {
            selections.splice(indexOf, 1)
        } else {
            selections.push({ text: value })
        }

        items[index] = { text: null, selections }
        setRecord(prevState => ({
            ...prevState,
            items
        }))
    }, [record])

    const onSubmitContest = useCallback(async () => {
        try {
            const { data } = await axios.post(API_URL+'/record/submit', record)

            if(data) {
                alert('Nộp bài thành công, trở về trang chủ !')
            }
        } catch (error) {
            alert('Nộp bài chưa thành công, vui lòng thử lại')
        }

    }, [record])

    // JSX renderer

    const renderQuestions = () => {
        if (!formState) return;

        let recordItemsText: string | null = null
        return formState.questions.map((question, index) => {
            switch (question.answerType) {
                case AnswerType.Text:
                    recordItemsText = record?.items ? record?.items[index]?.text ?? null : null

                    return (
                        <TextQuestion
                            index={index}
                            question={question.question}
                            recordValue={recordItemsText}
                            onAnswerChange={onAnswerChange}
                            key={index}
                            image={question.image}

                        />
                    )

                case AnswerType.MultipleText:
                    recordItemsText = record?.items ? record?.items[index]?.text ?? null : null

                    return (
                        <MultiLineQuestion
                            index={index}
                            question={question.question}
                            recordValue={recordItemsText}
                            onAnswerChange={onAnswerChange}
                            image={question.image}
                            key={index}

                        />
                    )

                case AnswerType.Select:
                    recordItemsText = record?.items ? record?.items[index]?.text ?? null : null

                    return (
                        <SelectionQuestion
                            index={index}
                            question={question.question}
                            recordValue={recordItemsText}
                            selections={question.answer.selections}
                            onAnswerChange={onAnswerChange}
                            key={index}
                        />
                    )

                case AnswerType.Radio:
                    recordItemsText = record?.items ? record?.items[index]?.text ?? null : null

                    return (
                        <RadioQuestion
                            index={index}
                            question={question.question}
                            recordValue={recordItemsText}
                            selections={question.answer.selections}
                            onAnswerChange={onAnswerChange}
                            key={index}
                        />
                    )

                case AnswerType.Checkbox:
                    recordItemsText = record?.items ? record?.items[index]?.text ?? null : null

                    return (
                        <CheckboxQuestion
                            index={index}
                            question={question.question}
                            recordValue={recordItemsText}
                            selections={question.answer.selections}
                            onMultipleAnswerChange={onMultipleAnswerChange}
                            key={index}
                        />
                    )


                default:
                    return;
            }
        })
    }

    return (
        <Box>
            <UserIdentify onSubmitContest={onSubmitContest} />
            <Box
                minHeight={{ lg: "100vh" }}
                p={{ xs: 0, lg: 4 }}
                py={{ xs: 1 }}
            >
                <Container>
                    <Paper sx={{ py: 4, px: { xs: 3, lg: 8 } }}>
                        <Box>
                            <Typography
                                textAlign={"center"}
                                fontSize={20}
                                textTransform="uppercase"
                                fontWeight={600}
                            >
                                {formState?.title}
                            </Typography>
                            <Typography fontSize={14} color="#777" textAlign={"center"}>
                                {formState?.author}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2, width: "20%", mx: 'auto' }} />
                        <Stack direction={"column"} mt={4} spacing={2}>
                            {renderQuestions()}
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </Box>

    );
}

export default ContestPaper;