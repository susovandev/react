import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector, removeUser } from '../app/index'
import type { IUserStateShape } from '../types'

const UserInfoList = ({
    isEditable,
    setIsEditable,
    setEditableUser,
}: {
    isEditable: boolean
    setIsEditable: (isEditable: boolean) => void
    editableUser: IUserStateShape | null
    setEditableUser: (editableUser: IUserStateShape | null) => void
}) => {
    const { userInfo } = useAppSelector((state) => state.user)
    const disPatch = useAppDispatch()

    const userUpdateHandler = (user: IUserStateShape) => {
        setIsEditable(!isEditable)
        setEditableUser(user)
    }

    const removeUserHandler = (userId: string) => {
        disPatch(removeUser(userId))
        toast.success('User removed successfully')
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">User Information</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Username</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Created At</th>
                            <th className="p-2 border">Updated At</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo &&
                            userInfo.length > 0 &&
                            userInfo.map((user) => (
                                <tr
                                    key={user?.id}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <td className="p-2 border text-sm">
                                        {user?.id}
                                    </td>
                                    <td className="p-2 border text-sm">
                                        {user?.username
                                            .charAt(0)
                                            .toUpperCase() +
                                            user?.username.slice(1)}
                                    </td>
                                    <td className="p-2 border text-sm">
                                        {user?.email}
                                    </td>
                                    <td className="p-2 border text-sm">
                                        {user?.status.split(' ').map((word) => (
                                            <span
                                                key={word}
                                                className="capitalize"
                                            >
                                                {word}{' '}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="p-2 border text-sm">
                                        {user?.createdAt.toLocaleString()}
                                    </td>
                                    <td className="p-2 border text-sm">
                                        {user?.updatedAt.toLocaleString()}
                                    </td>
                                    <td className="p-2 border">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    userUpdateHandler(user)
                                                }
                                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    removeUserHandler(user?.id)
                                                }
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UserInfoList
