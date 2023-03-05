import * as Yup from 'yup'


export const schemaRegister = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    lastname: Yup.string().required('El apellido es obligatorio'),
    username: Yup.string().required('El nombre de usuario es obligatorio')
                .min(6, ({ min }) => `El nombre de usuario debe tener al menos ${min} caracteres`)
                .max(50, ({ max }) => `El nombre de usuario no debe exceder de ${max} caracteres`),
    email: Yup.string()
                .email('El correo electrónico no es válido')
                .required('El correo electrónico es obligatorio'),
    password: Yup.string().required()
                .min(6, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
})

export const schemaLogin = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio')
                .min(6, ({ min }) => `El nombre de usuario debe tener al menos ${min} caracteres`)
                .max(50, ({ max }) => `El nombre de usuario no debe exceder de ${max} caracteres`),
    password: Yup.string().required()
                .min(6, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
})