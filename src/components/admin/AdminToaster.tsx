'use client';

import { useEffect } from 'react';
import { mountToaster, unmountToaster } from 'gooey-toast';

export function AdminToaster() {
  useEffect(() => {
    mountToaster({
      position: 'top-right',
      offset: { top: 20, right: 20 },
      options: {
        duration: 3200,
        roundness: 16,
      },
    });

    return () => {
      unmountToaster();
    };
  }, []);

  return null;
}
