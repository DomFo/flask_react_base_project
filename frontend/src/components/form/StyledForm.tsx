import React from "react";
import { Card, FormLabel, Button } from "@mui/material";
import { styled } from "@mui/material";


export const StyledFormCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5em',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    borderRadius: '12px',
});

export const StyledForm = styled('form')({
    gap: '1em',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1em',

});

export const StyleFormLabel = styled(FormLabel)({
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: "1em",
});

export const StyledFormErrorLabel = styled(FormLabel)({
    color: 'red',
    fontWeight: 600,
});



interface FormSubmitButtonProps {
    disabled: boolean;
    children: React.ReactNode;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ disabled, children }) => {
    return (
        <Button
            type="submit"
            variant="contained"
            disabled={disabled}
        >
            {children}
        </Button>
    )
}