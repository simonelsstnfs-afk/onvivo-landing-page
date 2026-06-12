/// <reference types="vite/client" />

interface Window {
  lemonSqueezyActive?: boolean;
  createLemonSqueezy?: () => void;
  LemonSqueezy?: {
    Setup: (options: { checkoutData: any }) => void;
    Url: {
      Open: (url: string) => void;
    };
  };
}
