import { vi } from "vitest";
import React from "react";
import { render, act } from "@testing-library/react";

// Declare mockPatch in outer scope so the mocked module can access the latest reference
let mockPatch: any;

vi.mock("./common/patchConnection", () => ({
    getPatchConnection: () => mockPatch,
}));

import { StoredStateStoreProvider, useStoredStateStore } from "./StoredStateStore";

// Helper component to drive updates
const TestComponent: React.FC<{ onRender?: (api: any) => void }> = ({ onRender }) => {
    const store = useStoredStateStore();
    onRender?.(store);
    return null;
};

describe("StoredStateStore patch integration", () => {
    let listeners: Record<string, Function[]>;

    beforeEach(() => {
        listeners = {};
        mockPatch = {
            sendStoredStateValue: vi.fn(),
            requestStoredStateValue: vi.fn(),
            requestFullStoredState: vi.fn((cb) => {
                // simulate async callback with empty state
                setTimeout(() => cb({ values: {} }), 0);
            }),
            addStoredStateValueListener: vi.fn((fn) => {
                (listeners["state_key_value"] ||= []).push(fn);
            }),
            removeStoredStateValueListener: vi.fn((fn) => {
                listeners["state_key_value"] = (listeners["state_key_value"] || []).filter((l) => l !== fn);
            }),
            // utility to emit
            emit(key: string, value: any) {
                (listeners["state_key_value"] || []).forEach((l) => l({ key, value }));
            },
        };

        // mock already registered above – just ensure module under test sees fresh mockPatch
    });

    afterEach(() => {
        vi.resetModules();
        // Re-register mock after module reset (Vitest clears mocks); ensure StoredStateStore keeps working if re-imported.
        vi.doMock("./common/patchConnection", () => ({
            getPatchConnection: () => mockPatch,
        }));
    });

    it("sends delta when updating local state", async () => {
        let api: any;
        render(
            <StoredStateStoreProvider>
                <TestComponent onRender={(a) => (api = a)} />
            </StoredStateStoreProvider>
        );

        await act(async () => {
            api.updateStoredStateItem("selectedInstrument")("snare1");
        });

        // should have sent stored state value for selectedInstrument
        expect(mockPatch.sendStoredStateValue).toHaveBeenCalledWith("selectedInstrument", "snare1");
    });

    it("updates local state when patch emits change", async () => {
        let api: any;
        render(
            <StoredStateStoreProvider>
                <TestComponent onRender={(a) => (api = a)} />
            </StoredStateStoreProvider>
        );

        await act(async () => {
            mockPatch.emit("selectedInstrument", "snare2");
        });

        expect(api.storedState.selectedInstrument).toBe("snare2");
    });
});
