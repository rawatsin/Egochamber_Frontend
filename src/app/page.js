import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard/PostCard";
import RightPanel from "@/components/RightPanel/RightPanel";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background grain">
      <Sidebar />

      <main className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-2xl space-y-5">
          <CreatePost />

          <div className="space-y-5">
            <PostCard />
            
            
          </div>
        </div>
      </main>

      <RightPanel />
    </div>
  );
}