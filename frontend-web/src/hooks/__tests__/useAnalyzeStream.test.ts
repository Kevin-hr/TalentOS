import { describe, expect, it } from "vitest";
import { getErrorMessageFromResponse } from "../useAnalyzeStream";

describe("getErrorMessageFromResponse", () => {
  it("should include JSON detail when provided", async () => {
    const response = new Response(JSON.stringify({ detail: "bad input" }), {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "content-type": "application/json",
      },
    });

    const message = await getErrorMessageFromResponse(response);
    expect(message).toContain("400");
    expect(message).toContain("Bad Request");
    expect(message).toContain("bad input");
  });

  it("should fall back to status when JSON is invalid", async () => {
    const response = new Response("not-json", {
      status: 422,
      statusText: "Unprocessable Entity",
      headers: {
        "content-type": "application/json",
      },
    });

    const message = await getErrorMessageFromResponse(response);
    expect(message).toContain("422");
    expect(message).toContain("Unprocessable Entity");
    expect(message).not.toContain("not-json");
  });

  it("should include plain text body when not JSON", async () => {
    const response = new Response("something broke", {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "content-type": "text/plain",
      },
    });

    const message = await getErrorMessageFromResponse(response);
    expect(message).toContain("500");
    expect(message).toContain("Internal Server Error");
    expect(message).toContain("something broke");
  });
});

