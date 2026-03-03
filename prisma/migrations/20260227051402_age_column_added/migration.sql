/*
  Warnings:

  - Added the required column `age` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `age` INTEGER NOT NULL;
