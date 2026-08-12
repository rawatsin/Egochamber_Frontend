import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard/PostCard";
import RightPanel from "@/components/RightPanel/RightPanel";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-0 bg-background grain">
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto w-full max-w-2xl space-y-5">
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
