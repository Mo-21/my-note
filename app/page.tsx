"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";

export default function Home() {
  return (
    <div>
      <NavigationBar />
    </div>
  );
}
