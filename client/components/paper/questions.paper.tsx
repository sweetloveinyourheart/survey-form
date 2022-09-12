import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"

interface TextTypeProps {
    recordValue: string | null
    index: number
    question: string
    onAnswerChange: (value: string, index: number) => void
    image?: string | null
}

interface MultipleTypeProps {
    index: number
    question: string
    recordValue: string | null
    onMultipleAnswerChange: (value: string, index: number) => void
    selections: { text: string }[] | null
}

interface SelectionTypeProps {
    index: number
    question: string
    recordValue: string | null
    selections: { text: string }[] | null
    onAnswerChange: (value: string, index: number) => void
}

export const TextQuestion: FC<TextTypeProps> = ({ question, index, recordValue, onAnswerChange, image }) => {
    return (
        <FormControl color="secondary">
            <FormLabel id={`q${index}`} sx={{ mb: 2 }}>
                <Box display={{ xs: "block", lg: "flex" }}>
                    <Typography fontWeight={600} mr={1} sx={{ textDecoration: "underline" }}> Câu {index + 1}: </Typography>
                    <Typography> {question} </Typography>
                </Box>
            </FormLabel>
            {image
                && (
                    <Box
                        height={300}
                        position="relative"
                        sx={{ mb: 2 }}
                    >
                        <Image
                            layout="fill"
                            objectFit="contain"
                            src={image}
                            alt="#"
                        />
                    </Box>
                )
            }
            <TextField
                label="Outlined"
                variant="outlined"
                aria-labelledby={`q${index}`}
                color="secondary"
                value={recordValue}
                onChange={(e) => onAnswerChange(e.target.value, index)}
            />
        </FormControl>
    )
}

export const MultiLineQuestion: FC<TextTypeProps> = ({ question, index, recordValue, onAnswerChange, image }) => {
    return (
        <FormControl color="secondary">
            <FormLabel id={`q${index}`} sx={{ mb: 2 }}>
                <Box display={{ xs: "block", lg: "flex" }}>
                    <Typography fontWeight={600} mr={1} sx={{ textDecoration: "underline" }}> Câu {index + 1}: </Typography>
                    <Typography> {question} </Typography>
                </Box>
            </FormLabel>
            {image
                && (
                    <Box
                        height={300}
                        position="relative"
                        sx={{ mb: 2 }}
                    >
                        <Image
                            layout="fill"
                            objectFit="contain"
                            src={image}
                            alt="#"
                        />
                    </Box>
                )
            }
            <TextField
                label="Outlined"
                variant="outlined"
                aria-labelledby={`q${index}`}
                color="secondary"
                multiline
                minRows={10}
                value={recordValue}
                onChange={(e) => onAnswerChange(e.target.value, index)}
            />
        </FormControl>
    )
}

export const SelectionQuestion: FC<SelectionTypeProps> = ({ question, index, recordValue, onAnswerChange, selections }) => {
    return (
        <FormControl color="secondary">
            <FormLabel id={`q${index}`} sx={{ mb: 2 }}>
                <Box display={{ xs: "block", lg: "flex" }}>
                    <Typography fontWeight={600} mr={1} sx={{ textDecoration: "underline" }}> Câu {index + 1}: </Typography>
                    <Typography> {question} </Typography>
                </Box>
            </FormLabel>
            <Select
                sx={{ maxWidth: 300 }}
                value={recordValue}
                onChange={(e) => onAnswerChange(String(e.target.value), index)}
            >
                <MenuItem value='' disabled >Chọn câu trả lời ...</MenuItem>
                {selections?.map((selection, id) => (
                    <MenuItem value={selection.text} key={`a-${index}-${id}`}>{selection.text}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export const RadioQuestion: FC<SelectionTypeProps> = ({ question, index, recordValue, onAnswerChange, selections }) => {
    return (
        <FormControl color="secondary">
            <FormLabel id={`q${index}`} sx={{ mb: 2 }}>
                <Box display={{ xs: "block", lg: "flex" }}>
                    <Typography fontWeight={600} mr={1} sx={{ textDecoration: "underline" }}> Câu {index + 1}: </Typography>
                    <Typography> {question} </Typography>
                </Box>
            </FormLabel>
            <RadioGroup
                aria-labelledby={`q${index}`}
                name={`q${index}`}
                color="secondary"
                value={recordValue}
                onChange={(e, text) => onAnswerChange(text, index)}
            >
                {selections?.map((selection, id) => (
                    <FormControlLabel
                        value={selection.text}
                        key={`a-${index}-${id}`}
                        control={
                            <Radio color="secondary" value={selection.text} />
                        }
                        label={selection.text}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export const CheckboxQuestion: FC<MultipleTypeProps> = ({ question, index, recordValue, onMultipleAnswerChange, selections }) => {
    return (
        <FormControl color="secondary">
            <FormLabel id={`q${index}`} sx={{ mb: 2 }}>
                <Box display={{ xs: "block", lg: "flex" }}>
                    <Typography fontWeight={600} mr={1} sx={{ textDecoration: "underline" }}> Câu {index + 1}: </Typography>
                    <Typography> {question} </Typography>
                </Box>
            </FormLabel>
            {selections?.map((selection, id) => (
                <FormControlLabel
                    value={selection.text}
                    key={`a-${index}-${id}`}
                    control={
                        <Checkbox
                            color="secondary"
                            value={selection.text}
                            onChange={(e, checked) => {
                                onMultipleAnswerChange(selection.text, index)
                            }}
                        />
                    }
                    label={selection.text}
                />
            ))}
        </FormControl>
    )
}