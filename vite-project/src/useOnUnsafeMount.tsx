import type { EffectCallback } from "react"
import { useEffect, useRef } from "react"

type CleanupFunction = () => void;
type Deps = React.DependencyList | undefined;

export function useOnMountUnsafe(effect: EffectCallback, deps?: Deps, cleanup?: CleanupFunction ) {
  const initialized = useRef(false)

  // This has effect only running once for the initialization - even if the dep changes
  useEffect(() => {
    console.log('Initializing effect', initialized, deps);
    if (!initialized.current) {
      initialized.current = true;
      console.log('Calling effect')
      effect();
      return ( () => {
        console.log('Effect cleanup');
        initialized.current = false
        cleanup && cleanup();
      })
    } else {
      console.log('Effect already run');
    }
  }, deps)
}