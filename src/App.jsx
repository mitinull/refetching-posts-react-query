import { Header } from "./Header";
import { PostList } from "./PostList";

function App() {
  return (
    <div className="bg-slate-300 min-h-[100vh] max-w-xl mx-auto">
      <Header />
      <div className="p-5 relative">
        <p className="mb-5 text-sm text-orange-900 bg-orange-300 py-3 px-5 rounded-sm">
          This process will attempt to resolve a promise up to 3 times, each
          time with a random chance of success, simulating unpredictable
          outcomes.
        </p>
        <PostList />
      </div>
    </div>
  );
}

export default App;
