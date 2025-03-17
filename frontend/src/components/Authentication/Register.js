import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Register = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const postDetails = (pics) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "rikka");
            fetch("https://api.cloudinary.com/v1_1/rikka/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());

                    setLoading(false);
                });
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
                onClick: { submitHandler },
                isLoading: { loading },
            });
            return;
        }
    };

    const submitHandler = () => {};

    return (
        <VStack spacing={"5px"} color={"black"}>
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    value={name}
                    placeholder="Enter Your Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        value={password}
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        value={confirmPassword}
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your picture</FormLabel>
                <InputGroup>
                    <Input
                        type="file"
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => {
                            postDetails(e.target.value);
                        }}
                    />
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width={"100%"}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Register;
