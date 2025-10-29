import { createContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../service/authService";
import type { User } from "../interface/users";
import { fa } from "zod/v4/locales";
import { adminService } from "@/service/adminService";
import { set } from "lodash";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (username: string, password: string) => Promise<boolean | null>;
    adminLogin: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    me: User | null,
    loading: boolean,
    error: string | null,
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [me, setMe] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const adminFlag = localStorage.getItem("is_admin") === "true";

        if (token) {
            setIsAuthenticated(true);
            setIsAdmin(adminFlag);
        }
        if(storedUser){
            setMe(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);

        try {
            const response = await authService.login(username, password);
            const { token, user } = response;

            if(token){
                setIsAuthenticated(true);
                setIsAdmin(false);
                if(user){
                    setMe(user);
                    localStorage.setItem("user", JSON.stringify(user));
                }
                localStorage.setItem("token", token);
                localStorage.setItem("is_admin", "false");
            }
            return true
        } catch (err: any) {
            if(err?.status == 404 || err?.status == 401){
                const errorMsg = err?.status == 404 || err?.status == 401 ? t("notify.error.password_incorrect") : t("notify.error.login_failed");
                setError(errorMsg);
                // toast.error(errorMsg || "Login failed");
            } else {
                const errMsg = t("notify.error.login_failed") || "Login failed";
                setError(errMsg);
                // toast.error(errMsg);
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const adminLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
        const response = await adminService.login(username, password);
        const { user, token } = response;
        localStorage.removeItem("user");
        setMe(null);

        if (token) {
            setIsAuthenticated(true);
            setIsAdmin(true);
            if(user){
                setMe(user);
                localStorage.setItem("user", JSON.stringify(user));
            }
            localStorage.setItem("token", token);
            localStorage.setItem("is_admin", "true");
        } else {
            throw new Error("Not an admin");
        }

        return true;
        } catch (err) {
            setError("Admin login failed");
        return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true)
        try {
            await authService.logout();
            setIsAuthenticated(false);
            setIsAdmin(false);
            setMe(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("is_admin");
        } catch (err) {
            setError("Admin login failed");
            return false;
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                login, 
                logout, 
                me, 
                loading, 
                adminLogin, 
                isAdmin,
                error
            }}>
            {children}
        </AuthContext.Provider>
    )
};

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };