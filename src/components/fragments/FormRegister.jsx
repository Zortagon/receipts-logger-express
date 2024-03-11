import { useState } from "react";
import PropTypes from "prop-types";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { cn, isCorrectEmail } from "../../../lib/utils";

const ResponseMessage = ({ message, success }) => {
    return (
        <div
            className={cn(
                "w-full",
                "rounded-md border border-red-600 bg-red-800",
                success === true && "border-green-600 bg-green-800",
                "mb-5",
                "px-2.5 py-1.5",
                "text-base/6 text-red-50 sm:text-sm/6",
                success === true && "text-green-50",
            )}
        >
            {message}
        </div>
    );
};

ResponseMessage.propTypes = {
    message: PropTypes.string,
    success: PropTypes.bool,
};

const FormRegister = () => {
    const [submitData, setSubmitData] = useState({
        email: "arthur@mail.com",
        password: "Jancuk@123",
    });
    const [inputError, setInputError] = useState({ email: "", password: "" });
    const [fetchState, setFetchState] = useState({
        isFetching: false,
        success: null,
        message: null,
    });

    const handleChange = {
        email: function (event) {
            const { value } = event.target;
            setSubmitData({ ...submitData, email: value });
            let errorInput = "";
            errorInput =
                !isCorrectEmail(value) && value !== ""
                    ? "Enter a valid email address"
                    : errorInput;
            setInputError({ ...inputError, email: errorInput });
        },
        password: function (event) {
            const { value } = event.target;
            setSubmitData({ ...submitData, password: value });
            let errorInput = "";
            errorInput =
                value.length < 6 && value !== ""
                    ? "Password length must be at least 6 characters."
                    : errorInput;
            setInputError({ ...inputError, password: errorInput });
        },
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const emptyField = Object.keys(submitData).filter(
            (field) => submitData[field] === "" && inputError[field] === "",
        );
        if (emptyField.length !== 0)
            setInputError((prevError) => {
                emptyField.map((field) => {
                    let message;
                    if (field === "email") message = "Enter an email address";
                    else message = "Enter a password";
                    prevError[field] = message;
                });
                return { ...prevError };
            });

        const { email: errEmail, password: errPassword } = inputError;
        if (errEmail !== "" || errPassword !== "") {
            return;
        }

        const { email, password } = submitData;
        setFetchState({ ...fetchState, isFetching: true, success: null });
        await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const { success, error } = await response.json();
                const { status } = response;
                let message;
                if (status === 409) {
                    const { message } = error;
                    setFetchState({
                        ...fetchState,
                        isFetching: false,
                        success: null,
                    });
                    setInputError({ ...inputError, email: message });
                    return;
                } else if (status === 201) {
                    message = `Welcome ${email}`;
                }
                setFetchState({
                    ...fetchState,
                    isFetching: false,
                    success: success,
                    message,
                });
            })
            .catch((error) => {
                console.info(error.message);
                setFetchState({
                    isFetching: false,
                    success: false,
                    message:
                        "Unable to register your account, please try again later.",
                });
            });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-10 w-full max-w-md self-center"
        >
            <h1 className="mb-10 text-center text-2xl font-semibold">
                Sign up for your account
            </h1>
            {fetchState.success !== null && (
                <ResponseMessage
                    message={fetchState.message}
                    success={fetchState.success}
                />
            )}
            <Input
                label="Email address"
                name="email"
                id="input_register_email"
                className="mb-4 w-full"
                onChange={handleChange.email}
                value={submitData.email}
                error={inputError.email}
                keepErrorField={true}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                id="input_register_password"
                className="mb-6 w-full"
                onChange={handleChange.password}
                value={submitData.password}
                error={inputError.password}
                keepErrorField={true}
            />
            <Button type="submit" disabled={fetchState.isFetching}>
                {fetchState.isFetching ? (
                    <>
                        <svg
                            className="mr-1.5 h-4 w-4 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Signing up...
                    </>
                ) : (
                    "Sign up"
                )}
            </Button>
        </form>
    );
};

FormRegister.propTypes = {};

export default FormRegister;
