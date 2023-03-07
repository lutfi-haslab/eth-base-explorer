import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type blockInfoPersist = (
  config: StateCreator<blockInfo>,
  options: PersistOptions<blockInfo>
) => StateCreator<blockInfo>;

const blockInfoStore = create<blockInfo>(
  (persist as blockInfoPersist)(
    (_set: any) => ({
      id: "",
      setBlockId: (data) => _set({ id: data }),
    }),
    { name: "block-store" }
  )
);

export { blockInfoStore }