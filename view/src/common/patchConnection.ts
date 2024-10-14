declare global {
  interface Element {
    CmajorSingletonPatchConnection?: any;
  }
}

export const getPatchConnection = () =>
  window.frameElement && window.frameElement.CmajorSingletonPatchConnection;
