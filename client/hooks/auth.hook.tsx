import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { API_URL } from "../constants/api";
import axios from "axios";

export interface AuthInterface {
    accessToken: string | undefined
    authError: string | undefined
    login: (username: string, password: string) => void
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthInterface>({} as AuthInterface)

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }: { children: any }) {
    const [accessToken, setAccessToken] = useState<string | undefined>()
    const [authError, setAuthError] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(true)

    const intervalRef = useRef<any>()

    const login = useCallback(async (username: string, password: string) => {
        try {
            setLoading(true)
            const res = await axios.post<{ accessToken?: string }>(API_URL + '/auth/login', { username, password }, { withCredentials: true })

            axios.defaults.headers.common['Authorization'] = res.data.accessToken || ''
            setAccessToken(res.data.accessToken)
            setAuthError('')
            setLoading(false)

        } catch (error) {
            setAccessToken(undefined)
            setAuthError('Thông tin tài khoản hoặc mật khẩu không chính xác !')
            setLoading(false)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            await axios.get(API_URL + '/auth/logout', { withCredentials: true })
            setAccessToken(undefined)
        } catch (error) {
            setAccessToken(undefined)
        }
    }, [])

    const refresh = async () => {
        try {
            const { data } = await axios.get<{ accessToken?: string }>(API_URL + '/auth/refreshToken/', { withCredentials: true })
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}` || ''
            setAccessToken(data.accessToken)
            setLoading(false)
        } catch (error) {
            setAccessToken(undefined)
            setLoading(false)
            logout()
            clearInterval(intervalRef.current)
        }
    }

    useEffect(() => {
        if (!accessToken) {
            // Refresh Token
            refresh()

            // Refetch new token every 10 minute !
            const interval = setInterval(async () => refresh(), 10 * 60 * 1000);
            intervalRef.current = interval;
            return () => clearInterval(interval);
        }
    }, [])

    const memoedValue = useMemo(() => ({
        accessToken,
        authError,
        login,
        logout,
        loading
    }), [accessToken, authError, login, logout, loading])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;