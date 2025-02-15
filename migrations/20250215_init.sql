CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "notion_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");


CREATE TABLE "NotionAuthState" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotionAuthState_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "NotionAuthState_user_id_key" ON "NotionAuthState"("user_id");

CREATE UNIQUE INDEX "NotionAuthState_state_key" ON "NotionAuthState"("state");

CREATE INDEX "NotionAuthState_state_idx" ON "NotionAuthState"("state");

ALTER TABLE "NotionAuthState" ADD CONSTRAINT "NotionAuthState_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE; 