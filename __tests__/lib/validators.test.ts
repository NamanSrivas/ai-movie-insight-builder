/**
 * Tests for IMDb ID validation — the same regex used in both
 * the SearchBar component and the API route.
 */
describe("IMDb ID Validation", () => {
  const isValidImdbId = (id: string): boolean => /^tt\d{7,}$/i.test(id);

  it("accepts valid 7-digit IMDb IDs", () => {
    expect(isValidImdbId("tt0133093")).toBe(true); // The Matrix
    expect(isValidImdbId("tt0111161")).toBe(true); // Shawshank Redemption
  });

  it("accepts valid 8+ digit IMDb IDs", () => {
    expect(isValidImdbId("tt10872600")).toBe(true); // Spider-Man: NWH
    expect(isValidImdbId("tt12345678")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isValidImdbId("TT0133093")).toBe(true);
    expect(isValidImdbId("Tt0133093")).toBe(true);
  });

  it("rejects empty strings", () => {
    expect(isValidImdbId("")).toBe(false);
  });

  it("rejects IDs without tt prefix", () => {
    expect(isValidImdbId("0133093")).toBe(false);
    expect(isValidImdbId("nm0000138")).toBe(false);
  });

  it("rejects IDs with fewer than 7 digits", () => {
    expect(isValidImdbId("tt123")).toBe(false);
    expect(isValidImdbId("tt123456")).toBe(false);
    expect(isValidImdbId("tt")).toBe(false);
  });

  it("rejects non-numeric characters after tt", () => {
    expect(isValidImdbId("ttabcdefg")).toBe(false);
    expect(isValidImdbId("tt01330a3")).toBe(false);
  });
});
