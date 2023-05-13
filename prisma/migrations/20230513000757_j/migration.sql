-- CreateIndex
CREATE INDEX "Clip_userId_wordId_idx" ON "Clip"("userId", "wordId");

-- CreateIndex
CREATE INDEX "ClipReport_userId_clipId_wordId_idx" ON "ClipReport"("userId", "clipId", "wordId");

-- CreateIndex
CREATE INDEX "Rate_clipId_userId_idx" ON "Rate"("clipId", "userId");

-- CreateIndex
CREATE INDEX "SocialMedia_userId_idx" ON "SocialMedia"("userId");

-- CreateIndex
CREATE INDEX "User_email_role_idx" ON "User"("email", "role");

-- CreateIndex
CREATE INDEX "Word_userId_idx" ON "Word"("userId");

-- CreateIndex
CREATE INDEX "WordReport_userId_wordId_idx" ON "WordReport"("userId", "wordId");
