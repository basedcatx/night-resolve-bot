export function strHighlightBoxFormatter(str: string) {
  return str
    .split('\n')
    .map((s) => `\`${s}\``)
    .join('\n');
}

export function strMarkDownBoxFormatter(str: string) {
  return str.split('\n').map((s) => `\`\`\`${s}\`\`\``);
}
