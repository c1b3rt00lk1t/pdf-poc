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
});
