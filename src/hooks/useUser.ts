import { useState } from "react"
import type { User, UserEffective, UserProfile } from "../interface/users"
import { userService } from "../service/userService";
import type { PrivateArticle } from "../interface/posts";
import { postService } from "@/service/postService";

export const useUser = () => {
    // const [users, setUsers] = useState<User[]>([]);
    const [effectiveUsers, setEffectiveUsers] = useState<UserEffective[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [myArticles, setMyArticles] = useState<PrivateArticle[]>([])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // const getAllUsers = async () => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const data = await userService.getAllUsers();
    //         setUsers(data);
    //     } catch (err: any) {
    //         setError(err.message || "Có lỗi xảy ra");
    //     }
    //     finally {
    //         setLoading(true);
    //     }
    // }

    const getUserById = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await userService.getUserById(id);
            setUser(data);
        } catch (err: any) {
            setError(err.message || "Có lỗi xảy ra");
        }
        finally {
            setLoading(false);
        }
    }

    const getProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await userService.getProfile();
            setProfile(data)
        } catch (err: any) {
            setError(err.message || "Lấy thông tin thất bại.");
        }
        finally {
            setLoading(false);
        }
    }

    const getMyArticles = async () => {
        setLoading(true);
        
        try {
            const data = await postService.getPrivateArticles();
            setMyArticles(data);
        } catch (err: any) {
            setError(err.message || "Không thể lấy được bài viết.");
        }
        finally {
            setLoading(false);
        }
    }

    const getEffectiveUser = async () => {
        setLoading(true);

        try {
            const data = await userService.getEffectiveUser();
            setEffectiveUsers(data);
        } catch (err: any) {
            setError(err.message || "Không thể lấy được danh sách người dùng.");
        } finally {
            setLoading(false);
        }
    }
 
    return { 
        user, 
        profile, 
        myArticles, 
        effectiveUsers,
        getUserById, 
        getProfile, 
        getMyArticles,
        getEffectiveUser,
        loading,
        error
    }
}