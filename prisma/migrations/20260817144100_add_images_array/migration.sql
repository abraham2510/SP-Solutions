-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
