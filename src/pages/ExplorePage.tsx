import Loading from "@/components/loading";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"; 
import { Link } from 'react-router-dom'

const ExplorePage = () => {
    const { effectiveUsers, getEffectiveUser, loading } = useUser();

    useEffect(() => {
        const fetchUsers = async () => {
            await getEffectiveUser();
        }
        fetchUsers()
    }, []);

    if(loading){
        return <Loading />
    }

  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Người dùng nổi bật nhất</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {effectiveUsers.map(user => (
            <Link key={user.user_id} to={`/users/${user.user_id}/posts`}>
              <Card className="shadow-md cursor-pointer hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>{user.display_name}</CardTitle>
                  <CardDescription>@{user.username}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <span>User ID: {user.user_id}</span>
                  <Badge variant="secondary">{user.total_posts} posts</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
}

export default ExplorePage;