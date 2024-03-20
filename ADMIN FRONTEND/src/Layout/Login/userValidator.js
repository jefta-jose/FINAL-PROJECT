import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const useUserLoginValidator = () => {
    const schema = yup.object().shape({
        Email: yup.string().email().required("Email is required"),
        Password: yup.string().required("Password is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    console.log('Schema:', schema);
    console.log('Errors:', errors);

    return {
        register,
        handleSubmit,
        errors,
    };
};