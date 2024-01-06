import { useDeviceType } from "./useDeviceType";
import { renderHook } from "@testing-library/react";

describe("Test useDeviceType", () => {
  const originalNavigator = { ...window.navigator };
  afterEach(() => {
    // Restore the original navigator object before each test
    window.navigator = { ...originalNavigator };
  });

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

  it("returns Mobile if device has orientation", () => {
    // Arrange
    Object.defineProperty(window, "orientation", {
      value: true,
      writable: true,
    });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false, // make no match
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
    expect(mQ.matches).toBe(false);

    const { result } = renderHook(useDeviceType, { initialProps: {} });

    // Assert
    expect(result.current).toBe("Mobile");
  });
});
