/*
  Warnings:

  - You are about to drop the `NoteTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `NoteTag` DROP FOREIGN KEY `NoteTag_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `NoteTag` DROP FOREIGN KEY `NoteTag_tagId_fkey`;

-- DropTable
DROP TABLE `NoteTag`;
