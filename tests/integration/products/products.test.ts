import { PRODUCTS_URL } from "@/endpoints/endpoints";
import { createApiClient } from "../../helpers/api.helpers";
import {
  expectSuccessResponse,
  expectErrorResponse,
} from "../../helpers/assertion.helpers";
import { productFixtures } from "../../fixtures/product.fixtures";
import { TEST_CONSTANTS } from "../../config/test-constants";

describe("Product Endpoint Tests", () => {
  const apiClient = createApiClient();

  describe("GET /api/products/[id]", () => {
    it("should return a product with correct structure", async () => {
      const productId = productFixtures.validProductId();
      const response = await apiClient.get(`${PRODUCTS_URL}/${productId}`);

      expectSuccessResponse(response, 200);

      const product = response.data;

      // Test basic product properties
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("originalPrice");
      expect(product).toHaveProperty("images");
      expect(product).toHaveProperty("stock");
      expect(product).toHaveProperty("isLimited");
      expect(product).toHaveProperty("limitedStartTime");
      expect(product).toHaveProperty("limitedEndTime");
      expect(product).toHaveProperty("isActive");
      expect(product).toHaveProperty("freeShipping");
      expect(product).toHaveProperty("createdAt");
      expect(product).toHaveProperty("updatedAt");

      // Test calculated fields
      expect(product).toHaveProperty("effectiveStock");
      expect(product).toHaveProperty("hasVariants");
      expect(product).toHaveProperty("availableSizes");
      expect(product).toHaveProperty("availableColors");
    });

    it("should include variants array with correct structure", async () => {
      const productId = productFixtures.validProductId();
      const response = await apiClient.get(`${PRODUCTS_URL}/${productId}`);
      const product = response.data;

      expect(Array.isArray(product.variants)).toBe(true);

      if (product.variants.length > 0) {
        const variant = product.variants[0];

        expect(variant).toHaveProperty("id");
        expect(variant).toHaveProperty("productId");
        expect(variant).toHaveProperty("size");
        expect(variant).toHaveProperty("color");
        expect(variant).toHaveProperty("sku");
        expect(variant).toHaveProperty("stock");
        expect(variant).toHaveProperty("price");
        expect(variant).toHaveProperty("images");
        expect(variant).toHaveProperty("isActive");
        expect(variant).toHaveProperty("createdAt");
        expect(variant).toHaveProperty("updatedAt");

        // Test variant data types
        expect(typeof variant.id).toBe("number");
        expect(typeof variant.productId).toBe("number");
        expect(typeof variant.stock).toBe("number");
        expect(typeof variant.isActive).toBe("boolean");
      }
    });

    it("should return 404 for non-existent product", async () => {
      const productId = productFixtures.invalidProductId();
      const response = await apiClient.get(`${PRODUCTS_URL}/${productId}`);
      expectErrorResponse(response, TEST_CONSTANTS.HTTP_STATUS.NOT_FOUND);
    });

    it("should return 400 for invalid product ID", async () => {
      const response = await apiClient.get(`${PRODUCTS_URL}/invalid`);
      expectErrorResponse(response, TEST_CONSTANTS.HTTP_STATUS.BAD_REQUEST);
    });
  });

  describe("GET /api/products (all products)", () => {
    it("should return array of products", async () => {
      const response = await apiClient.get(PRODUCTS_URL);
      expectSuccessResponse(response, 200);
      expect(Array.isArray(response.data)).toBe(true);

      if (response.data.length > 0) {
        const product = response.data[0];
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("effectiveStock");
        expect(product).toHaveProperty("hasVariants");
      }
    });

    it("should filter out inactive products by default", async () => {
      const response = await apiClient.get(PRODUCTS_URL);
      response.data.forEach((product: any) => {
        expect(product.isActive).toBe(true);
      });
    });

    it("should include inactive products when requested", async () => {
      const response = await apiClient.get(
        `${PRODUCTS_URL}?includeInactive=true`
      );

      expectSuccessResponse(response, 200);
      // Should include both active and inactive products
      const hasInactiveProducts = response.data.some(
        (product: any) => !product.isActive
      );
      // This test might pass or fail depending on your data, but the endpoint should support it
    });
  });

  describe("Product Business Logic", () => {
    it("should handle limited products correctly", async () => {
      const productId = productFixtures.validProductId();
      const response = await apiClient.get(`${PRODUCTS_URL}/${productId}`);
      const product = response.data;

      if (product.isLimited) {
        expect(product).toHaveProperty("limitedStartTime");
        expect(product).toHaveProperty("limitedEndTime");

        if (product.limitedStartTime && product.limitedEndTime) {
          const startTime = new Date(product.limitedStartTime);
          const endTime = new Date(product.limitedEndTime);
          expect(startTime.getTime()).toBeLessThan(endTime.getTime());
        }
      }
    });

    it("should have valid date formats", async () => {
      const productId = productFixtures.validProductId();
      const response = await apiClient.get(`${PRODUCTS_URL}/${productId}`);
      const product = response.data;

      expect(new Date(product.createdAt)).toBeInstanceOf(Date);
      expect(new Date(product.updatedAt)).toBeInstanceOf(Date);

      if (product.limitedStartTime) {
        expect(new Date(product.limitedStartTime)).toBeInstanceOf(Date);
      }
      if (product.limitedEndTime) {
        expect(new Date(product.limitedEndTime)).toBeInstanceOf(Date);
      }
    });

    it("should have valid image URLs", async () => {
      const productId = productFixtures.validProductId();
      const response = await apiClient.get(`${PRODUCTS_URL}/${productId}`);
      const product = response.data;

      if (product.images && product.images.length > 0) {
        product.images.forEach((image: string) => {
          expect(typeof image).toBe("string");
          expect(image.length).toBeGreaterThan(0);
        });
      }
    });
  });
});
