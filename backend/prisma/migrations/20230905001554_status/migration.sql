-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "open_order" TEXT NOT NULL,
    "attendance" TEXT NOT NULL,
    "conclued" TEXT NOT NULL,
    "finally" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);
