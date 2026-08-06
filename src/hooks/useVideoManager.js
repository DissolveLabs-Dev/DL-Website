import { useEffect } from 'react'
import { initVideoManager } from '../engines/video-manager.js'

/**
 * useVideoManager — the .svc-video sync-start / visibility play-pause
 * manager. Scans `document.querySelectorAll('video')` globally (all 4
 * background videos live in Services), so — like useDepthEngine — this
 * belongs in the root component's effect, after every section has mounted.
 */
export function useVideoManager() {
  useEffect(() => {
    const cleanup = initVideoManager()
    return cleanup
  }, [])
}
