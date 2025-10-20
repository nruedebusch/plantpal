"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner, Center } from "@chakra-ui/react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="purple.600" />
      </Center>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
