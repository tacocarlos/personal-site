-- CreateTable
CREATE TABLE "Biography" (
    "id" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Biography_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Biography_name_key" ON "Biography"("name");
