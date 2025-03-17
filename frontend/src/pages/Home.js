import {
    Container,
    Box,
    Text,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

const Home = () => {
    return (
        <Container maxW={"xl"} centerContent>
            <Box
                d="flex"
                justifyContent={"center"}
                p={3}
                bg={"white"}
                w={"100%"}
                m={"40px 0 15px 0"}
                borderRadius={"lg"}
                borderWidth={"1px"}
            >
                <Text fontSize={"4xl"} fontFamily={"Segoe UI"}>
                    Chat App
                </Text>
            </Box>
            <Box
                bg="white"
                w={"100%"}
                p={4}
                borderRadius={"lg"}
                borderWidth={"1px"}
            >
                <Tabs variant="soft-rounded">
                    <TabList mb={"1em"}>
                        <Tab width={"50%"}>Login</Tab>
                        <Tab width={"50%"}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Register />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default Home;
