export function get_mentioned_users(messageTokens: string[]) {
  const mentioned = [];
  for (const token in messageTokens) {
    if (token.startsWith('<@') && token.endsWith('>')) {
      if (token.includes('&')) continue;
      mentioned.push(token.slice(2, -1));
    }
  }
  return mentioned;
}

export function get_mentioned_roles(messageTokens: string[]) {
  const mentioned = []
  for (const token in messageTokens) {
    if (token.startsWith("<@&") && token.endsWith(">")) mentioned.push(token)
  }
  return mentioned
}