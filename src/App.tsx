import { LoginForm } from "./components/LoginForm";
import { MainLoginFormImage } from "./components/MainLoginFormImage";

export function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFD1B0] bg-[url(main_background.png)] bg-[position:-90px_center] bg-no-repeat px-6">
      <div className="flex h-[768px] w-[1366px] items-center justify-center gap-[73.39px] sm:rounded-3xl sm:bg-white/30 sm:px-4 sm:backdrop-blur-xs">
        <LoginForm />

        <MainLoginFormImage />
      </div>
    </div>
  );
}
