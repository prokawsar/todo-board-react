import ReactLogo from "@components/ReactLogo";
import SupabaseLogo from "@components/SupabaseLogo";

function App() {
  document.title = "Todo board";
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col px-3">
        <main className="flex flex-1 flex-col items-center justify-center gap-6">
          <h1 className="text-center text-3xl">
            <span className="font-bold text-slate-600">Todo Board</span> built
            with
          </h1>
          <div className="flex flex-row items-center  gap-3">
            <ReactLogo />
            <SupabaseLogo />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
