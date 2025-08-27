const GetAllMentionedUsers = (messageTokens: string[]) => {
  const mentioned = [];
  for (const token of messageTokens) {
    console.log(token);
    if (token.startsWith('<@') && token.endsWith('>')) {
      if (token.includes('&')) continue;
      mentioned.push(token.slice(2, -1));
    }
  }
  return mentioned;
};
export default GetAllMentionedUsers;
