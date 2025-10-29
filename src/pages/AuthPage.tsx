import { useState } from "react";   
import { authService } from "../service/authService";


export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: "", password: "", display_name: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError(null);

        try {
            if (isLogin) {
                const response = await authService.login(
                    form.username, form.password
                );
            } else {
                const response = await authService.register(
                    form.username, form.password, form.display_name
                );
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Some error occurred");
        }
    };

    return (
        <div className="bg-white flex items-center justify-center min-h-screen">
            <div className="w-96 bg-white p-6 rounded-2xl space-y-4">
                <h2 className="text-2xl text-center mb-4">
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </h2>

                {!isLogin && (
                    <input
                        type="text"
                        name="display_name"
                        placeholder="Tên hiển thị"
                        value={form.display_name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-[10px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                )}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-[10px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-[10px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-100 text-lg py-2 rounded hover:bg-blue-200 transition"
                    >
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                    <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer">
                        {isLogin ? "Đăng ký" : "Đăng nhập"}
                    </span>
                </p>
            </div>
        </div>
    );
}
