"use client";

import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";
import { getRouteTitle, homeLinks } from "@/utils/links";

interface HomeHeaderProps {
  content: React.ReactNode;
  setContent: (content: React.ReactNode) => void;
}

const HomeHeaderContext = React.createContext<HomeHeaderProps | undefined>(
  undefined
);

interface HomeHeaderProviderProps {
  children: React.ReactNode;
}

export function HomeHeaderProvider({ children }: HomeHeaderProviderProps) {
  const [contentState, setContent] = React.useState<React.ReactNode>(null);
  const path = usePathname();

  const handleChangeHeader = useCallback(
    (newContent: React.ReactNode) => {
      const predefinedPath = getRouteTitle(path, homeLinks);

      if (predefinedPath) {
        setContent(newContent);
        return;
      }

      setContent(newContent);
    },
    [path]
  );

  useEffect(() => {
    const predefinedPath = getRouteTitle(path, homeLinks);

    if (predefinedPath) {
      setContent(<h3>{predefinedPath}</h3>);
      return;
    }
  }, [path]);

  const contextValue = useMemo(
    () => ({ content: contentState, setContent: handleChangeHeader }),
    [contentState, handleChangeHeader]
  );
  return (
    <HomeHeaderContext.Provider value={contextValue}>
      {children}
    </HomeHeaderContext.Provider>
  );
}

export function useHomeHeader() {
  const context = React.useContext(HomeHeaderContext);
  if (!context) {
    throw new Error("useHomeHeader must be used within a HomeHeaderProvider");
  }
  return context;
}
