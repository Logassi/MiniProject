"use client";
// import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  //   const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-300 shadow-md">
      {/* Logo Section */}
      <div>
        <button
          onClick={() => router.push("/")}
          className="text-xl font-semibold text-red-500"
        >
          LOGO
        </button>
      </div>

      {/* Navigation Links */}
      {/* <div className="flex space-x-6">
        <button
          className="text-gray-700 hover:text-red-500 transition-all"
          onClick={() => router.push("/events")}
        >
          Events
        </button>
        <button
          className="text-gray-700 hover:text-red-500 transition-all"
          onClick={() => router.push("/host")}
        >
          Host
        </button>
        <button
          className="text-gray-700 hover:text-blue-500 transition-all"
          onClick={() => router.push("/pricing")}
        >
          Pricing
        </button>
      </div> */}

      {/* User Authentication/Logout Section */}
      {/* {user ? (
        <div className="flex items-center space-x-4">
          <p className="text-gray-700">Welcome, {user.name}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : ( */}
      <div className="flex space-x-4">
        {/* Sementara, tapi harusnya ada authorization baru user bisa lihat button di bawah */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/event")}
        >
          Create Event
        </button>
        {/* Sementara, tapi harusnya ada authorization baru user bisa lihat button di diatas */}

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/register")}
        >
          Sign Up
        </button>
        <button
          className="bg-transparent border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-4 rounded"
          onClick={() => router.push("/login")}
        >
          Log In
        </button>
      </div>
      {/* )} */}
    </div>
  );
}
