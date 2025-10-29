import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <div className="max-w-md">
        <img
          src="/404.jpg"
          alt="404 - Page Not Found"
          className="mx-auto w-64 h-64 md:w-96 md:h-96 object-contain"
        />

        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-card-foreground">
          Oops! Page Not Found
        </h1>

        <p className="mt-2 text-lg text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" onClick={() => navigate("/home")}>
            Go to Home
          </Button>
          {/* <Button variant="outline" onClick={() => navigate(-2)}>
            Go Back
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
