-- CreateTable
CREATE TABLE "NotionAuthState" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotionAuthState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotionAuthState_user_id_key" ON "NotionAuthState"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "NotionAuthState_state_key" ON "NotionAuthState"("state");

-- CreateIndex
CREATE INDEX "NotionAuthState_state_idx" ON "NotionAuthState"("state");

-- AddForeignKey
ALTER TABLE "NotionAuthState" ADD CONSTRAINT "NotionAuthState_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
