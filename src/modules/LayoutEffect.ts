import { useLayoutEffect, useEffect } from "react";

export const LayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
