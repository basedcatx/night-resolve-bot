import { Colors, EmbedBuilder } from 'discord.js';

export abstract class SettingsResetEmbedClass {
  public static embedSuccess = (option: string) => {
    return new EmbedBuilder()
      .setTitle('Reset succeeded')
      .setDescription(`Reset to default was successful for option: \`${option}\``)
      .setColor(Colors.Green)
      .setTimestamp();
  };
  public static embedError = (option: string) => {
    return new EmbedBuilder()
      .setTitle('Reset failed')
      .setDescription(`There was an error resetting: \`${option}\``)
      .setColor(Colors.Red)
      .setTimestamp();
  };

  public static embedNotFoundError = () => {
    return new EmbedBuilder()
      .setTitle('Reset failed')
      .setDescription(`Option not found.`)
      .setColor(Colors.Red)
      .setTimestamp();
  };
}
