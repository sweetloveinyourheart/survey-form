import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface EmptyDisplayerProps {
    text: string
    height?: number
}

const EmptyDisplayer: FunctionComponent<EmptyDisplayerProps> = ({ text, height }) => {
    return (
        <Box height={height || 300} display="flex" alignItems={"center"} justifyContent="center">
            <Typography color="#777" textAlign={"center"}>{text}</Typography>
        </Box>
    );
}

export default EmptyDisplayer;