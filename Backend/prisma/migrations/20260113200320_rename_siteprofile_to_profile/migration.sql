/*
  Warnings:

  - The values [SiteProfile] on model [Profile] will be renamed to [Profile] on the database. All data will be preserved.
  - The values [siteProfileId] on model [SocialLink] will be renamed to [profileId] on the database. All data will be preserved.

*/
-- RenameTable
ALTER TABLE "SiteProfile" RENAME TO "Profile";

-- RenameForeignKey
ALTER TABLE "SocialLink" RENAME COLUMN "siteProfileId" TO "profileId";

-- RenameConstraint
ALTER TABLE "SocialLink" RENAME CONSTRAINT "SocialLink_siteProfileId_fkey" TO "SocialLink_profileId_fkey";
