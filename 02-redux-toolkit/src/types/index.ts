export interface IUserStateShape {
    id: string
    username: string
    email: string
    status: string
    createdAt: Date
    updatedAt: Date
}
export interface IUserFormShape {
    username: string
    email: string
    status: string
}

export interface IUserFormProps {
    isEditable: boolean
    editableUser: IUserStateShape | null
    setIsEditable: (isEditable: boolean) => void
    setEditableUser: (editableUser: IUserStateShape | null) => void
}
