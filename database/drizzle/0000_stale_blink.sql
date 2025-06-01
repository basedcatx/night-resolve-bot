CREATE TABLE "guild_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"config" jsonb DEFAULT '{"adminRoles":["admin"],"minimumPlayers":5,"maximumPlayers":0,"dayDuration":60000,"nightDuration":120000,"revealRolesOnDeath":true,"skipVoteAllowed":false,"hardcoreMode":false,"allowSpectators":false,"gameTheme":"mafia"}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
