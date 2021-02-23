import { useEffect, useLayoutEffect } from "react";

export const LayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
