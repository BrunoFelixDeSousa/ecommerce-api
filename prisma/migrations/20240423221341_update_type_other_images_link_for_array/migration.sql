/*
  Warnings:

  - The `other_images_link` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "other_images_link",
ADD COLUMN     "other_images_link" VARCHAR(1000)[];
