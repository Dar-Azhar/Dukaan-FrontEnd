import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth()
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (currentUser) {
        return children
    }
    return <Navigate to="/login" replace />
}

export default PrivateRoute