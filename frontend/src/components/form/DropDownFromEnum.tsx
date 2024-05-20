import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

interface DropDownFromEnumProps<T> {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    options: Record<string, T>;
    label: string;
    disabled?: boolean;
}

export const DropDownFromEnum = <T extends string>({ value, setValue, options, label, disabled }: DropDownFromEnumProps<T>) => {
    return (
        <FormControl sx={{ minWidth: 400 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={(event) => setValue(event.target.value as T)}
                sx={{ minWidth: 400 }}
                disabled={disabled}
            >
                {Object.keys(options).map((key) => {
                    const optionValue = options[key as keyof typeof options];
                    return (
                        <MenuItem
                            key={key}
                            value={optionValue}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

// Example usage with UserRole enum
export enum UserRole {
    USER = 'user',
    ATHLETE = 'athlete',
    RESEARCHER = 'researcher',
    ADMIN = 'admin'
}

interface UserRoleDropDownProps {
    role: UserRole;
    setRole: React.Dispatch<React.SetStateAction<UserRole>>;
    disabled?: boolean;
}

export const UserRoleDropDown: React.FC<UserRoleDropDownProps> = ({ role, setRole, disabled }) => {
    return (
        <DropDownFromEnum
            value={role}
            setValue={setRole}
            options={UserRole}
            label="Role"
            disabled={disabled}
        />
    );
}
