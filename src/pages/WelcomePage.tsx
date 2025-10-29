import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react"
import { useAuth } from "@/hooks/useAuth";

const WelcomePage = () => {
    const {isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <header className="text-text px-6 py-3 flex justify-evenly items-center">
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 cursor-pointer select-none"
                    >
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-xl font-semibold tracking-tight">Blogly</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {/* <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        Resources
                    </a>
                    <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        Documentation
                    </a>
                    <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        About us
                    </a> */}
                </nav>
                <div className="flex item-center space-x-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <Button onClick={logout} className="" variant="default">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                        <Button onClick={() => navigate("/login")} className="">Login</Button>
                        <Button onClick={() => navigate("/register")} className="">Register</Button>
                        </div>
                    )}
                </div>
            </header>
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Blog Platform</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl">Discover, share, and connect with a community of passionate writers and readers. Join us today and start your blogging journey!</p>
                <Button
                    onClick={() => navigate(isAuthenticated ? "/home" : "/register")}
                    className="px-6 py-3 text-lg rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
                >
                    {isAuthenticated ? "Go to Home" : "Get Started"}
                </Button>
            </div>
        </div>
    );

}

export default WelcomePage;