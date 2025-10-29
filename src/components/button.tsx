import React from "react"

type ButtonProps = {
  onClick?: () => void
  children: React.ReactNode
  variant? : "primary" | "secondary" | "danger",
  className?: string,
  href?: string,
}


const Button: React.FC<ButtonProps> = ({children, onClick, variant = "primary", href, className}) => {
    const base = "px-4 py-2 rounded-lg font-medium transition";

    const variants = {
        primary: "text-text hover:bg-blue-100",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-500 text-black hover:bg-red-600",
    }

    const classes = `${base} ${variants[variant]} ${className}`;

    if (href) {
        return (
        <a href={href} className={classes}>
            {children}
        </a>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
        {children}
        </button>
    );
}

export default Button;