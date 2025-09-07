"use client";

import { useStackApp } from "@stackframe/stack";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Custom auth hook for Convex that integrates with Stack Auth
 * Avoids using Stack Auth's useUser hook which always uses Suspense
 * Instead uses the Stack client directly to manage authentication state
 */
export function useStackAuth() {
  const stackApp = useStackApp();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check authentication status on mount and set up listeners
  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Get user without suspense by using the stackApp directly
        const currentUser = await stackApp.getUser();
        
        if (mounted) {
          setUser(currentUser);
          setIsAuthenticated(!!currentUser);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        if (mounted) {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    // Initial check
    checkAuth();

    // Set up periodic checks for auth state changes
    const interval = setInterval(checkAuth, 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [stackApp]);

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (!isAuthenticated || !user) {
        return null;
      }

      try {
        // Get the auth JSON which contains the access token
        const authJson = await user.getAuthJson();
        
        if (!authJson || !authJson.accessToken) {
          console.log("No access token available");
          return null;
        }

        if (forceRefreshToken) {
          // For force refresh, we could implement a proper refresh mechanism here
          // For now, we'll get a fresh token
          console.log("Force refresh requested - getting fresh token");
          try {
            // Try to get a fresh user instance
            const freshUser = await stackApp.getUser();
            if (freshUser) {
              const freshAuthJson = await freshUser.getAuthJson();
              return freshAuthJson?.accessToken || null;
            }
          } catch (refreshError) {
            console.error("Error during force refresh:", refreshError);
            // Fall back to existing token
          }
        }

        return authJson.accessToken;
      } catch (error) {
        console.error("Error fetching Stack Auth access token:", error);
        return null;
      }
    },
    [isAuthenticated, user, stackApp]
  );

  return useMemo(
    () => ({
      isLoading,
      isAuthenticated,
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}
