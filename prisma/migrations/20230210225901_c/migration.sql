-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "clipID" TEXT NOT NULL,
    CONSTRAINT "Rate_clipID_fkey" FOREIGN KEY ("clipID") REFERENCES "Clip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rate_id_key" ON "Rate"("id");
