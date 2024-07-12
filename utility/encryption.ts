import { createHash } from 'crypto';

const cipher = (salt: string) => {
  const textToChars = (text: string) =>
    text.split('').map((c: string) => c.charCodeAt(0));
  const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: number, b: number) => a ^ b, code);

  return (text: string) =>
    text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

const decipher = (salt: string) => {
  const textToChars = (text: string) =>
    text.split('').map((c: string) => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: number, b: number) => a ^ b, code);
  return (encoded: string) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex: string) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode: number) => String.fromCharCode(charCode))
      .join('');
};

const hashing = (text: string) => {
  return createHash('sha256').update(text).digest('hex');
};

export { cipher, decipher, hashing };
