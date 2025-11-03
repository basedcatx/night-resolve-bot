const GetAllMentionedRoles = (messageTokens: string[]) => {
  const mentioned = [];
  for (const token of messageTokens) {
    if (token.startsWith('<@&') && token.endsWith('>')) {
      mentioned.push(token.slice(3, -1));
    }
  }
  return mentioned;
};
export default GetAllMentionedRoles;
