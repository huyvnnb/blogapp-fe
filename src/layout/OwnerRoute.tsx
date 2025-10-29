import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState, type JSX } from "react";
import axiosClient from "@/service/axiosClient";

const OwnerRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { id } = useParams<{ id: string }>(); // post id
  const { me, loading } = useAuth();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  useEffect(() => {
    if (!me) return;

    axiosClient.get(`/posts/${id}/`).then((res) => {
      setIsOwner(res.data.data.author.id === me.id);
    }).catch(() => {
      setIsOwner(false);
    });
  }, [id, me]);

  if (loading || isOwner === null) return <div>Loading...</div>;
  if (!isOwner) return <Navigate to="/404" />;

  return children;
};

export default OwnerRoute;
