export function cutString(string) {
  const maxLenth = 60;
  if (string && string.length > maxLenth) {
    string = `${string.substring(0, maxLenth)}...`;
  }
  return string;
}
