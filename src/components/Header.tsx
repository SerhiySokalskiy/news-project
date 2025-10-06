import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md w-full">
      <div className="flex justify-around items-center p-4 w-full">
        <h1 className="text-xl font-bold">My News App</h1>
        <Navbar />
      </div>
    </header>
  );
}
