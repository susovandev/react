import { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
    useAppDispatch,
    updateUser,
    addUser,
    useAppSelector,
} from '../app/index'
import type { IUserFormProps, IUserFormShape, IUserStateShape } from '../types'

const UserForm = ({
    isEditable,
    editableUser,
    setIsEditable,
    setEditableUser,
}: IUserFormProps) => {
    const { userInfo } = useAppSelector((state) => state.user)
    console.log(userInfo)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IUserFormShape>()

    const disPatch = useAppDispatch()

    const onSubmit: SubmitHandler<IUserFormShape> = (data) => {
        if (isEditable && editableUser !== null) {
            const updatedUser: IUserStateShape = {
                ...editableUser,
                updatedAt: new Date(),
                ...data,
            }
            disPatch(updateUser(updatedUser))
            toast.success(`${data?.username}'s account updated successfully`)
            setIsEditable(false)
            setEditableUser(null)
        } else {
            const existedUser = userInfo.find(
                (user) =>
                    user.username === data?.username ||
                    user.email === data?.email
            )
            if (existedUser) {
                toast.error('Account already exits')
                return
            }

            const newUser: IUserStateShape = {
                id: nanoid(),
                username: data?.username.toLowerCase(),
                email: data?.email.toLocaleLowerCase(),
                status: data?.status.toLowerCase(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            disPatch(addUser(newUser))
            toast.success(`${data?.username}'s account created successfully`)
        }
        reset({ username: '', email: '', status: '' })
    }

    useEffect(() => {
        if (isEditable && editableUser) {
            reset({
                username: editableUser.username,
                email: editableUser.email,
                status: editableUser.status,
            })
        } else {
            reset({ username: '', email: '', status: '' })
        }
    }, [isEditable, editableUser, reset])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 rounded shadow-md bg-gray-100 dark:bg-gray-800"
        >
            <h3 className="text-lg font-semibold">
                {isEditable ? 'Edit Your Account' : 'Create Your Account'}
            </h3>
            <div>
                <label htmlFor="username" className="block mb-1">
                    Enter Your Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="w-full p-2 border rounded"
                    {...register('username', {
                        required: !isEditable ? 'Username is required' : false,
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                    })}
                />
                {errors.username && (
                    <small className="text-red-500">
                        {errors.username.message}
                    </small>
                )}
            </div>
            <div>
                <label htmlFor="email" className="block mb-1">
                    Enter Your Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded"
                    {...register('email', {
                        required: !isEditable ? 'Email is required' : false,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && (
                    <small className="text-red-500">
                        {errors.email.message}
                    </small>
                )}
            </div>
            <div>
                <label htmlFor="status" className="block mb-1">
                    Enter Your Status
                </label>
                <select
                    id="status"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    {...register('status', {
                        required: !isEditable ? 'Status is required' : false,
                    })}
                >
                    <option value="frontend-developer">
                        Frontend Developer
                    </option>
                    <option value="backend-developer">Backend Developer</option>
                    <option value="fullstack-developer">
                        Full Stack Developer
                    </option>
                    <option value="mobile-developer">Mobile Developer</option>
                    <option value="devops-engineer">DevOps Engineer</option>
                    <option value="ui-ux-designer">UI/UX Designer</option>
                </select>
                {errors.status && (
                    <small className="text-red-500">
                        {errors.status.message}
                    </small>
                )}
            </div>
            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                {isEditable ? 'Save' : 'Submit'}
            </button>
        </form>
    )
}

export default UserForm
