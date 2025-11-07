import {
  CommandInteraction,
  EmbedBuilder,
  GuildChannel,
  MessageFlags,
  MessageReaction,
  SlashCommandBuilder,
  User,
} from 'discord.js';
import { ClientWithExtendedTypes } from '../../types/types';
import { ChannelFactory } from '../../classes/managers/ChannelFactory';
import { log } from '../../utils/logger';
import { emojiCollection } from '../../constants/emojis';
import { LOBBY_BASE_DURATION, MIN_PLAYER_IN_GAME } from '../../types/globals';
import { LobbyManager } from '../../classes/game/LobbyManager';
import { PlayerManager } from '../../classes/game/PlayerManager';
import { GameThreadManagerError } from '../../errors/GameThreadManagerError';
import { strMarkDownBoxFormatter } from '../../utils/utility';

const createLobbyCommand = new SlashCommandBuilder()
  .setName('createlobby')
  .setDescription('Creates a game lobby in the channel this command was ran in.');

// I am spreading the slashcommand instance to avoid having to manually define the command's name and desc (This is just a placeholder, and is a bad practice)
const command = {
  name: createLobbyCommand.name,
  description: createLobbyCommand.description,
  data: createLobbyCommand,
  cooldown: 0,
  async execute(client: ClientWithExtendedTypes, interaction: CommandInteraction): Promise<void> {
    const channelManagerResult = ChannelFactory.fromId(interaction.channelId ?? '', client);
    if (!channelManagerResult.ok) {
      console.error(channelManagerResult.error);
      return log.error(channelManagerResult.error);
    }

    const channelManager = channelManagerResult.value;

    if (channelManager === undefined) {
      return log.error('Invalid guild channel. Was interaction called from a channel?', {
        channelId: interaction.channelId,
        channelName: (interaction.channel as GuildChannel).name,
      });
    }

    // We should also check if this channel can support threads.
    if (!channelManager.supportThreads()) {
      return await channelManager?.postSystemMessage(
        "This current channel doesnot support thread-based channels. The game require's the lobby channel to be a Text channel or an Announcement channel",
      );
    }

    if (!channelManager?.hasThreadPermission(client)) {
      return await channelManager?.postSystemMessage(
        "I don't have permissions to create and manage thread-based channels. Maybe you should consider re-adding me to the server with necessary permisions? if this persists, please contact my author.",
      );
    }

    const lobbyEmbed = new EmbedBuilder()
      .setDescription('Lobby created... expires in a min, when the minimum number of players join')
      .setColor('Green')
      .setTimestamp();

    // This would actually be the final thing to do (To reply to our interaction)

    if (!interaction.isRepliable) {
      return log.info('This current channel is not interactive.', {
        channelId: interaction.channelId,
        channelType: interaction.channel?.type,
      });
    }

    const existingLobby: LobbyManager = client.lobbyManagers.get(channelManager.id);
    if (existingLobby && existingLobby.getState() === 'awaiting_players') {
      await interaction.followUp({
        content: "You can't create another lobby while there's a current in progress",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    const lobbyManager = new LobbyManager(channelManager.id);
    lobbyManager.setState('awaiting_players');

    await interaction.reply({ embeds: [lobbyEmbed] });
    const msg = await interaction.fetchReply();
    await msg.react(emojiCollection.thumbs_up);
    await msg.react(emojiCollection.thumbs_down);

    const joinFilter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name === emojiCollection.thumbs_up && !user.bot;
    };

    const leaveFilter = (reaction: MessageReaction, user: User) =>
      reaction.emoji.name === emojiCollection.thumbs_down && !user.bot;

    const joinCollector = msg.createReactionCollector({
      filter: joinFilter,
    });

    const leaveCollector = msg.createReactionCollector({
      filter: leaveFilter,
    });

    const gameThreadManagerResult = await lobbyManager.createGameThread(client);
    if (!gameThreadManagerResult.ok) {
      console.error(gameThreadManagerResult.error);
      return log.error(gameThreadManagerResult.error);
    }
    const gameThreadManager = gameThreadManagerResult.value!;

    joinCollector
      ?.on('collect', async function collect(collected, user) {
        const player = PlayerManager.createPlayerManager(user.id, client);
        const res = gameThreadManager.addPlayer(player);
        if (!res.ok) {
          if ((res.error as GameThreadManagerError).ctx.type === 'user') {
            return await interaction.followUp({ content: res.error.message, flags: [MessageFlags.Ephemeral] });
          }
          return log.error(res.error);
        }

        const heading = msg.embeds[0].description;

        const embed = EmbedBuilder.from(msg.embeds[0]).setDescription(
          heading + '\n\n' + strMarkDownBoxFormatter(gameThreadManager.getPlayers().join('\n')),
        );
        await interaction.editReply({ embeds: [embed] });
      })
      .on('end', () => {
        if (gameThreadManager.countPlayers() >= MIN_PLAYER_IN_GAME) {
          leaveCollector.stop();
          return log.info('Reached');
          // Our lobby and game thread manager would switch states at this point.
          // We would update the interaction box with the next instructions.
        }
      });

    leaveCollector?.on('collect', async function collect(collected, user) {
      const player = PlayerManager.createPlayerManager(user.id, client);
      const res = gameThreadManager.removePlayer(player);
      if (!res.ok) {
        if ((res.error as GameThreadManagerError).ctx.type === 'user') {
          return await interaction.followUp({ content: res.error.message, flags: [MessageFlags.Ephemeral] });
        }
        return log.error(res.error);
      }
    });

    // Using timed collectors don't work so well, setTimeout does the trick
    setTimeout(function queue() {
      // First we check if our collectors are all stopped to prevent infinite loops.
      if (joinCollector.ended) {
        if (leaveCollector.ended) return;
        return leaveCollector.stop();
      }

      if (gameThreadManager.countPlayers() >= MIN_PLAYER_IN_GAME) {
        joinCollector.stop();
        leaveCollector.stop();
        return;
      }

      const embed = EmbedBuilder.from(msg.embeds[0])
        .setDescription('The minimum number of players not reached, extending lobby for another 60s...')
        .setColor('Yellow');
      interaction.editReply({ embeds: [embed] });
      setTimeout(queue, LOBBY_BASE_DURATION);
    }, LOBBY_BASE_DURATION);
  },
};

export default command;
