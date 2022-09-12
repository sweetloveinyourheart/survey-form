import { Box, CircularProgress } from "@mui/material";
import Head from "next/head";
import { FunctionComponent } from "react";

interface LoadingScreenProps {}
 
const LoadingScreen: FunctionComponent<LoadingScreenProps> = () => {
    return (  
        <Box height={"100vh"} width="100%" display={"flex"} justifyContent="center" alignItems={"center"}>
            <Head>
                <title>Loading ...</title>
            </Head>
            <CircularProgress color="success" />
        </Box>
    );
}
 
export default LoadingScreen;