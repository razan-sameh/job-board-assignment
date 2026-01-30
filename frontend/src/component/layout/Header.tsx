/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import { Briefcase, User, Sun, Moon, LogOut, LogIn } from "lucide-react";
import Container from "../ui/Container";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout, useMe } from "@/lib/hooks/useAuth";

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useMe();
  const logoutMutation = useLogout();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login"); // Redirect to login after logout
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-lightGray/50 bg-background">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={"/"}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-secondary">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              JobBoard
            </span>
          </Link>

          {/* User & Theme Toggle */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2 font-medium text-content transition-colors">
                <User className="w-5 h-5" />
                <span>{user.fullName}</span>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 p-2 rounded hover:bg-lightGray transition-colors"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}

            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-lightGray transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-icon" />
                ) : (
                  <Sun className="w-5 h-5 text-icon" />
                )}
              </button>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 p-2 rounded hover:bg-lightGray transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
