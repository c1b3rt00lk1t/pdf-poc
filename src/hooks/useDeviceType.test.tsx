import { useDeviceType } from "./useDeviceType";
import { renderHook } from "@testing-library/react-hooks";

describe("Test useDeviceType", () => {
  it("returns Mobile if device has maxTouchPoints", () => {
    // Arrange
    const maxTouchPoints = 1; // Greater than 0 for mobile
    Object.defineProperty(window.navigator, "maxTouchPoints", {
      value: maxTouchPoints,
      writable: true,
    });

    const { result } = renderHook(useDeviceType, { initialProps: {} });

    // Assert
    expect(result.current).toBe("Mobile");
  });
  it("returns Mobile if device has pointer:coarse", () => {
    // Arrange

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true, // a match is a mobile device
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    const mQ = matchMedia("(pointer:coarse)");
    expect(mQ.matches).toBe(true);
    const { result } = renderHook(useDeviceType, { initialProps: {} });

    // Assert
    expect(result.current).toBe("Mobile");
  });
});
