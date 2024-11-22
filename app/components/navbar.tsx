import { Link } from "@remix-run/react";

export function Navbar() {
  return (
    <nav className="mx-auto py-4 px-4 md:px-12 max-w-[1240px] flex justify-between border-b">
      <h1 className="font-bold text-3xl">
        <span className="text-red-500">m</span>
        <span className="text-green-500">M</span>
        <span className="text-blue-500">D</span>
        <span>B</span>
      </h1>

      <ul className="flex items-center gap-8">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
