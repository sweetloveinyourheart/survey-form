import { Container, Paper, Tab, Tabs } from "@mui/material";
import { FunctionComponent } from "react";

interface MenuProps {
    tab: number
    onTabChange: (tab: number) => void
}

const MenuBar: FunctionComponent<MenuProps> = ({ tab, onTabChange }) => {
    return (
        <Paper sx={{ pt: 2, mb: 4 }}>
            <Container>
                <Tabs
                    value={tab}
                    onChange={(e, value) => onTabChange(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Danh sách biểu mẫu" />
                    <Tab label="Tạo biểu mẫu" />
                    <Tab label="Chỉnh sửa biểu mẫu" sx={{ borderRight: '1px solid #eee' }}/>
                    <Tab label="Danh sách tài khoản" />
                    <Tab label="Tạo tài khoản" sx={{ borderRight: '1px solid #eee' }}/>
                    <Tab label="Thiết lập bảng câu hỏi" sx={{ borderRight: '1px solid #eee' }}/>
                    <Tab label="Kết quả trả lời" />
                </Tabs>
            </Container>
        </Paper>
    );
}

export default MenuBar;